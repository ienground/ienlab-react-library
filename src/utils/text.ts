export function hasLastConsonant(str: string): boolean {
  const trimmed = str.trimEnd();
  const last = trimmed.length === 0 ? null : trimmed[trimmed.length - 1];

  if (!last) return false;

  // 한글 음절 범위 확인 (0xAC00 ~ 0xD7A3)
  if (last.charCodeAt(0) < 0xAC00 || last.charCodeAt(0) > 0xD7A3) {
    return false;
  }

  // 초성, 중성, 종성 계산: (코드 - 0xAC00) % 28 == 0 이면 종성 없음
  return (last.charCodeAt(0) - 0xAC00) % 28 !== 0;
}

export function withLetterParticle(
  str: string,
  ifConsonant: string,
  notConsonant: string,
): string {
  return str + (hasLastConsonant(str) ? ifConsonant : notConsonant);
}

// 예시
// "가" + "는" -> "가는" (종성 없음)
// "캅" + "은" -> "캅은" (종성 있음)