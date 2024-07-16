export function slugify(text) {
  const words = text.split(" ");

  const convertedWords = words.map((word, index) => {
    let lowercaseWord = word.toLowerCase();

    let normalizedWord = lowercaseWord
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalizedWord === "–" || normalizedWord === "?") return normalizedWord;
    if (normalizedWord === "/") return "-";
    if (normalizedWord.length === 0) return "";
    return normalizedWord;
  });

  return convertedWords.filter((word) => word.length > 0).join("-");
}
