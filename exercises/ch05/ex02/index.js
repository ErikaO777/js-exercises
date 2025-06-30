export function toEscapeSequencewithIF(str) {
  if (str.includes("\\")) {
    return str.replace(/\\/g, "\\\\");
  } else if (str.includes("`")) {
    return str.replace(/`/g, "\`");
  } else if (str.includes('"')) {
    return str.replace(/"/g, '\"');
  } else {
    return str;
  }
}

export function toEscapeSequencewithSWITCH(str) {
  switch (str) {
    case str.includes("\\"):
      return str.replace(/\\/g, "\\\\");
    case str.includes("`"):
      return str.replace(/`/g, "\`");
    case str.includes('"'):
      return str.replace(/"/g, '\"');
    default:
      return str;
  }
}
