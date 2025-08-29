import { useLayoutEffect } from 'react';

function parseTokens(q: string): string[] {
  if (!q?.trim()) return [];
  const phrases: string[] = [];
  const re = /"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(q))) phrases.push(m[1]);
  const rest = q.replace(re, ' ');
  const words = rest.split(/\s+/).filter(Boolean);
  return [...phrases, ...words].map(s => s.normalize('NFKD').toLowerCase());
}

export function useLiveHighlight(ref: React.RefObject<HTMLElement | null>, text: string, query: string) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1) сбрасываем прошлую подсветку
    const prev = el.querySelectorAll('span[data-hl]');
    prev.forEach(node => node.replaceWith(document.createTextNode(node.textContent || '')));
    el.normalize();

    // 2) выставляем исходный текст, если кто-то его изменил
    if (el.textContent !== text) el.textContent = text;

    const tokens = parseTokens(query);
    if (!tokens.length) return;

    // 3) идём по текстовым нодам и оборачиваем совпадения
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let tn: Node | null;
    while ((tn = walker.nextNode())) {
      const textNode = tn as Text;
      const norm = textNode.data.normalize('NFKD').toLowerCase();

      for (const t of tokens) {
        let from = 0;
        while (t && (from = norm.indexOf(t, from)) !== -1) {
          const r = document.createRange();
          r.setStart(textNode, from);
          r.setEnd(textNode, from + t.length);

          const mark = document.createElement('span');
          mark.setAttribute('data-hl', '');
          mark.className = 'bg-yellow-300/60 rounded px-0.5';

          r.surroundContents(mark);
          from += t.length;
        }
      }
    }
  }, [ref, text, query]);
}
