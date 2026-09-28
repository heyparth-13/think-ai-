import { KnowledgeChunk, THINKARQ_KNOWLEDGE_BASE } from './knowledge-base';

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

export class VectorStore {
  private chunks: KnowledgeChunk[];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private vectors: Map<string, number[]> = new Map();

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
      .filter(w => w.length > 2);
  }

  private buildIndex() {
    this.vocabulary.clear();
    this.idf.clear();
    this.vectors.clear();

    const totalDocs = this.chunks.length;
    const docFrequencies: Map<string, number> = new Map();

    // 1. Build vocabulary and doc frequencies
    this.chunks.forEach(chunk => {
      const fullText = `${chunk.title} ${chunk.section} ${chunk.content} ${chunk.keywords.join(' ')}`;
      const tokens = new Set(this.tokenize(fullText));
      tokens.forEach(token => {
        docFrequencies.set(token, (docFrequencies.get(token) || 0) + 1);
        if (!this.vocabulary.has(token)) {
          this.vocabulary.set(token, this.vocabulary.size);
        }
      });
    });

    // 2. Compute IDF
    this.vocabulary.forEach((_, term) => {
      const df = docFrequencies.get(term) || 1;
      this.idf.set(term, Math.log((totalDocs + 1) / (df + 1)) + 1);
    });

    // 3. Compute TF-IDF vector for each chunk
    this.chunks.forEach(chunk => {
      const vector = this.createVector(`${chunk.title} ${chunk.section} ${chunk.content} ${chunk.keywords.join(' ')}`);
      this.vectors.set(chunk.id, vector);
    });
  }

  private createVector(text: string): number[] {
    const vector = new Array(this.vocabulary.size).fill(0);
    const tokens = this.tokenize(text);
    if (tokens.length === 0) return vector;

    const termCounts: Map<string, number> = new Map();
    tokens.forEach(t => termCounts.set(t, (termCounts.get(t) || 0) + 1));

    termCounts.forEach((count, term) => {
      const idx = this.vocabulary.get(term);
      if (idx !== undefined) {
        const tf = count / tokens.length;
        const idfVal = this.idf.get(term) || 1;
        vector[idx] = tf * idfVal;
      }
    });

    // Normalize
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

  public search(query: string, topK: number = 3, threshold: number = 0.05): SearchResult[] {
    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return [];
    }

    const queryVector = this.createVector(query);
    const results: SearchResult[] = [];

    this.chunks.forEach(chunk => {
      const chunkVector = this.vectors.get(chunk.id) || [];
      let score = this.cosineSimilarity(queryVector, chunkVector);

      // Boost score if keyword or title matches specifically
      const lowerQuery = query.toLowerCase();
      chunk.keywords.forEach(kw => {
        if (lowerQuery.includes(kw.toLowerCase())) {
          score += 0.25;
        }
      });
      if (chunk.title.toLowerCase().includes(lowerQuery)) {
        score += 0.3;
      }

      if (score >= threshold) {
        results.push({ chunk, score });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
}

// Global singleton
let globalVectorStore: VectorStore | null = null;

export function getVectorStore(): VectorStore {
  if (!globalVectorStore) {
    globalVectorStore = new VectorStore();
  }
  return globalVectorStore;
}
