export function formatIDR(value?: unknown) {
  if (typeof value !== 'number') {
    return '';
  }

  return value.toLocaleString('id-ID');
}

export function shortenText(value: string, maxLen: number, separator = ' ') {
  if (value.length <= maxLen) {
    return value;
  }

  return value.substr(0, value.lastIndexOf(separator, maxLen));
}
