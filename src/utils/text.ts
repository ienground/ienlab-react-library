export function getCompleteWord(word: string, firstValue: string, secondValue: string) {
  const lastName = word[word.length - 1].charCodeAt(0);
  if (lastName < 0xAC00 || lastName > 0xD7A3) {
    return "";
  } else {
    if ((lastName - 0xAC00) % 28 > 0) {
      return firstValue;
    } else {
      return secondValue;
    }
  }
}