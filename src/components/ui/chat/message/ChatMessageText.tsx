import { useRef } from 'react';
import { useLiveHighlight } from './useLiveHighLight';

export default function ChatMessageText({ text, query }: { text: string; query: string }) {
  const ref = useRef<HTMLElement>(null);
  useLiveHighlight(ref, text, query);
  return <span ref={ref}>{text}</span>;
}
