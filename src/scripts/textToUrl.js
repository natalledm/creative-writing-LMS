export default function textToUrl(name) {
  const removeExtraSpaces = name.trim();
  const lowercaseAll = removeExtraSpaces.toLowerCase();
  const newName = lowercaseAll.replaceAll(" ", "-");

  return newName;
}
