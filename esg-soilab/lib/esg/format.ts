export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPct(value: number) {
  return `${formatNumber(value, 1)}%`;
}
