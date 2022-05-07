export default function urlToText(name) {
  const removeExtraSpaces = name.trim();
  const newName = removeExtraSpaces.replaceAll("-", " ");
  const uppercaseInitials = newName.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
    match.toUpperCase(),
  );

  return uppercaseInitials;
}
