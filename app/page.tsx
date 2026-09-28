'use client';

import dynamic from 'next/dynamic';

const ChatWindow = dynamic(
  () => import('@/components/ChatWindow').then(mod => mod.ChatWindow),
  { ssr: false }
);

export default function Home() {
  return <ChatWindow />;
}
