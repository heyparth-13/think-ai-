import { KnowledgeChunk, THINKARQ_KNOWLEDGE_BASE } from './knowledge-base';

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
  matchType?: 'exact' | 'hybrid' | 'semantic' | 'keyword';
}

/**
 * Advanced Hybrid Vector & BM25 Store for ThinkArq RAG Engine
 * Implements:
 * 1. BM25 (Best Matching 25) sparse retrieval with term frequency saturation & length normalization
 * 2. Dense N-gram subword & token TF-IDF semantic vector representation
 * 3. Reciprocal Rank Fusion (RRF) for combining dense & sparse ranking
 * 4. Semantic category & title boosting
 */
export class VectorStore {
  private chunks: KnowledgeChunk[];
  
  // BM25 Index Data
  private docLengths: Map<string, number> = new Map();
  private avgDocLength: number = 0;
  private termDocFreq: Map<string, number> = new Map(); // term -> number of docs containing term
  private docTermFreqs: Map<string, Map<string, number>> = new Map(); // docId -> (term -> count)
  
  // Dense TF-IDF Index Data
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private denseVectors: Map<string, number[]> = new Map();

  // BM25 Tuning constants
  private readonly k1 = 1.5;
  private readonly b = 0.75;

  constructor(initialChunks: KnowledgeChunk[] = THINKARQ_KNOWLEDGE_BASE) {
    this.chunks = [...initialChunks];
    this.buildIndex();
  }

  public addChunks(newChunks: KnowledgeChunk[]) {
    const existingIds = new Set(this.chunks.map(c => c.id));
    for (const chunk of newChunks) {
      if (!existingIds.has(chunk.id)) {
        this.chunks.push(chunk);
      }
    }
    this.buildIndex();
  }

  public getChunks(): KnowledgeChunk[] {
    return this.chunks;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 2);
  }

  /**
   * Generates n-grams for character & subword semantic matching
   */
  private generateCharNgrams(text: string, n = 3): string[] {
    const clean = text.toLowerCase().replace(/\s+/g, ' ').trim();
    const ngrams: string[] = [];
    for (let i = 0; i <= clean.length - n; i++) {
      ngrams.push(clean.substring(i, i + n));
    }
    return ngrams;
  }

  private buildIndex() {
    this.vocabulary.clear();
    this.idf.clear();
    this.denseVectors.clear();
    this.docLengths.clear();
    this.termDocFreq.clear();
    this.docTermFreqs.clear();

    const totalDocs = this.chunks.length;
    let totalLength = 0;

    // 1. First pass: tokenize each chunk and record statistics
    this.chunks.forEach(chunk => {
      const fullText = `${chunk.title} ${chunk.title} ${chunk.section} ${chunk.category} ${chunk.keywords.join(' ')} ${chunk.content}`;
      const tokens = this.tokenize(fullText);
      const docLength = tokens.length;
      
      this.docLengths.set(chunk.id, docLength);
      totalLength += docLength;

      const termCounts = new Map<string, number>();
      tokens.forEach(token => {
        termCounts.set(token, (termCounts.get(token) || 0) + 1);
      });
      this.docTermFreqs.set(chunk.id, termCounts);

      // Track unique terms per doc for BM25 and vocabulary
      termCounts.forEach((_, term) => {
        this.termDocFreq.set(term, (this.termDocFreq.get(term) || 0) + 1);
        if (!this.vocabulary.has(term)) {
          this.vocabulary.set(term, this.vocabulary.size);
        }
      });
    });

    this.avgDocLength = totalDocs > 0 ? totalLength / totalDocs : 1;

    // 2. Compute IDF for both BM25 and Vector TF-IDF
    this.vocabulary.forEach((_, term) => {
      const df = this.termDocFreq.get(term) || 1;
      // BM25 IDF formulation
      const idfVal = Math.log((totalDocs - df + 0.5) / (df + 0.5) + 1);
      this.idf.set(term, Math.max(idfVal, 0.1));
    });

    // 3. Compute normalized dense TF-IDF vectors
    this.chunks.forEach(chunk => {
      const vector = new Array(this.vocabulary.size).fill(0);
      const termCounts = this.docTermFreqs.get(chunk.id) || new Map();
      const docLen = this.docLengths.get(chunk.id) || 1;

      termCounts.forEach((count, term) => {
        const idx = this.vocabulary.get(term);
        if (idx !== undefined) {
          const tf = count / docLen;
          const idfVal = this.idf.get(term) || 0.1;
          vector[idx] = tf * idfVal;
        }
      });

      // L2 Normalize
      const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
      if (magnitude > 0) {
        for (let i = 0; i < vector.length; i++) {
          vector[i] /= magnitude;
        }
      }
      this.denseVectors.set(chunk.id, vector);
    });
  }

  /**
   * Calculates Okapi BM25 score for a chunk
   */
  private scoreBM25(queryTokens: string[], chunkId: string): number {
    const termCounts = this.docTermFreqs.get(chunkId);
    if (!termCounts) return 0;

    const docLen = this.docLengths.get(chunkId) || this.avgDocLength;
    let score = 0;

    for (const term of queryTokens) {
      const tf = termCounts.get(term) || 0;
      if (tf === 0) continue;

      const idf = this.idf.get(term) || 0.1;
      const numerator = tf * (this.k1 + 1);
      const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLength));
      score += idf * (numerator / denominator);
    }

    return score;
  }

  /**
   * Creates normalized query vector for dense search
   */
  private createQueryVector(queryTokens: string[]): number[] {
    const vector = new Array(this.vocabulary.size).fill(0);
    if (queryTokens.length === 0) return vector;

    const termCounts = new Map<string, number>();
    queryTokens.forEach(t => termCounts.set(t, (termCounts.get(t) || 0) + 1));

    termCounts.forEach((count, term) => {
      const idx = this.vocabulary.get(term);
      if (idx !== undefined) {
        const tf = count / queryTokens.length;
        const idfVal = this.idf.get(term) || 0.1;
        vector[idx] = tf * idfVal;
      }
    });

    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
      for (let i = 0; i < vector.length; i++) {
        vector[i] /= magnitude;
      }
    }
    return vector;
  }

  private cosineSimilarity(v1: number[], v2: number[]): number {
    let dot = 0;
    for (let i = 0; i < v1.length; i++) {
      dot += v1[i] * v2[i];
    }
    return dot;
  }

  /**
   * Hybrid Search executing BM25 + Dense Semantic Cosine + Metadata Boosting + Reciprocal Rank Fusion (RRF)
   */
  public search(query: string, topK = 8, minThreshold = 0.015): SearchResult[] {
    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    const queryVector = this.createQueryVector(queryTokens);

    // 1. Compute BM25 Scores for all chunks
    const bm25Scores: { chunk: KnowledgeChunk; score: number }[] = [];
    this.chunks.forEach(chunk => {
      const score = this.scoreBM25(queryTokens, chunk.id);
      if (score > 0) {
        bm25Scores.push({ chunk, score });
      }
    });
    bm25Scores.sort((a, b) => b.score - a.score);

    // 2. Compute Dense Vector Scores for all chunks
    const denseScores: { chunk: KnowledgeChunk; score: number }[] = [];
    this.chunks.forEach(chunk => {
      const chunkVector = this.denseVectors.get(chunk.id) || [];
      const score = this.cosineSimilarity(queryVector, chunkVector);
      if (score > 0.005) {
        denseScores.push({ chunk, score });
      }
    });
    denseScores.sort((a, b) => b.score - a.score);

    // 3. Reciprocal Rank Fusion (RRF) with k = 60
    const rrfK = 60;
    const rrfMap = new Map<string, { chunk: KnowledgeChunk; score: number }>();

    bm25Scores.forEach((item, rank) => {
      const current = rrfMap.get(item.chunk.id) || { chunk: item.chunk, score: 0 };
      current.score += 1.0 / (rrfK + (rank + 1));
      rrfMap.set(item.chunk.id, current);
    });

    denseScores.forEach((item, rank) => {
      const current = rrfMap.get(item.chunk.id) || { chunk: item.chunk, score: 0 };
      current.score += 1.0 / (rrfK + (rank + 1));
      rrfMap.set(item.chunk.id, current);
    });

    // 4. Contextual Boosting (Exact keyword & metadata alignment)
    const combinedResults: SearchResult[] = [];

    rrfMap.forEach(({ chunk, score }) => {
      let finalScore = score;
      let matchedExact = false;

      // Keyword boost
      chunk.keywords.forEach(kw => {
        const lowerKw = kw.toLowerCase();
        if (lowerQuery.includes(lowerKw)) {
          finalScore += 0.035;
          matchedExact = true;
        }
      });

      // Exact title match boost
      if (chunk.title.toLowerCase().includes(lowerQuery)) {
        finalScore += 0.045;
        matchedExact = true;
      }

      // Section match boost
      if (chunk.section.toLowerCase().includes(lowerQuery)) {
        finalScore += 0.03;
        matchedExact = true;
      }

      // Specific Intent Boosts
      if (/\b(project|portfolio|case study|study|work|built|done)\b/i.test(lowerQuery) && chunk.category === 'projects') {
        finalScore += 0.04;
      }
      if (/\b(founder|ceo|jasmin|vaibhav|leadership|team|owner)\b/i.test(lowerQuery) && (chunk.category === 'team' || chunk.id.includes('founder'))) {
        finalScore += 0.06;
      }
      if (/\b(service|services|offer|what you do)\b/i.test(lowerQuery) && (chunk.category === 'overview' || chunk.category === 'ai' || chunk.category === 'data' || chunk.category === 'marketing')) {
        finalScore += 0.02;
      }
      if (/\b(hire|vibe coder|cursor developer|developer|team)\b/i.test(lowerQuery) && chunk.category === 'hiring') {
        finalScore += 0.04;
      }
      if (/\b(price|pricing|cost|how much|estimate|quote|budget|fee|charge|rupee|₹|inr)\b/i.test(lowerQuery) && chunk.category === 'pricing') {
        finalScore += 0.07;
      }
      if (/\b(faq|frequently asked|common question|how do|does think arq|do you|can you)\b/i.test(lowerQuery) && chunk.category === 'faq') {
        finalScore += 0.05;
      }

      if (finalScore >= minThreshold) {
        combinedResults.push({
          chunk,
          score: finalScore,
          matchType: matchedExact ? 'exact' : 'hybrid'
        });
      }
    });

    // Sort descending by final combined score
    combinedResults.sort((a, b) => b.score - a.score);

    return combinedResults.slice(0, topK);
  }
}

// Global singleton instance
let globalVectorStore: VectorStore | null = null;

export function getVectorStore(): VectorStore {
  if (!globalVectorStore) {
    globalVectorStore = new VectorStore();
  }
  return globalVectorStore;
}

/** Reset the singleton (useful for tests or hot-reload) */
export function resetVectorStore(): void {
  globalVectorStore = null;
}
