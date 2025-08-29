
// 1) разбор запроса: "точная фраза" + обычные слова
function parseQueryToTokens(query: string): string[] {
  const q = query?.trim();
  if (!q) return [];
  const phrases: string[] = [];
  const re = /"([^"]+)"/g;
  let m: RegExpExecArray | null;

  // фразы в кавычках
  while ((m = re.exec(q))) phrases.push(m[1]);

  // удаляем фразы и берём оставшиеся слова
  const rest = q.replace(re, ' ');
  const words = rest.split(/\s+/).filter(Boolean);

  return [...phrases, ...words].map(s =>
    s.normalize('NFKD').toLocaleLowerCase()
  );
}

// 2) поиск всех вхождений токенов, мердж интервалов
function buildRanges(text: string, tokens: string[]): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  const norm = text.normalize('NFKD').toLocaleLowerCase();

  for (const t of tokens) {
    if (!t) continue;
    let startIdx = 0;
    while (true) {
      const idx = norm.indexOf(t, startIdx);
      if (idx === -1) break;
      ranges.push([idx, idx + t.length]);
      startIdx = idx + t.length;
    }
  }

  if (!ranges.length) return ranges;

  // сортировка и мердж
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const [s, e] = ranges[i];
    const last = merged[merged.length - 1];
    if (s <= last[1]) {
      // пересечение/примыкание → расширяем
      last[1] = Math.max(last[1], e);
    } else {
      merged.push([s, e]);
    }
  }
  return merged;
}

// 3) сборка React-нод с подсветкой
export function highlightSubstrings(text: string, query: string): React.ReactNode {
  if (!query?.trim()) return text;
  const tokens = parseQueryToTokens(query);
  if (!tokens.length) return text;

  const ranges = buildRanges(text, tokens);
  if (!ranges.length) return text;

  const out: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach(([s, e], i) => {
    if (cursor < s) out.push(text.slice(cursor, s));
    out.push(
      <span key={`hit-${i}-${s}-${e}`} className="bg-yellow-300/60 rounded px-0.5">
        {text.slice(s, e)}
      </span>
    );
    cursor = e;
  });
  if (cursor < text.length) out.push(text.slice(cursor));

  return out;
}
