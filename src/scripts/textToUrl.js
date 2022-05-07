export default function textToUrl(name) {
  const lowercase = name.toLowerCase();
  const trim = lowercase.trim();
  const replace = trim.replace(" ", "-");

  return replace;
}
