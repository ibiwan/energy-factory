const SUFFIXES = [
  { threshold: 1e12, suffix: 'T' },
  { threshold: 1e9, suffix: 'G' },
  { threshold: 1e6, suffix: 'M' },
  { threshold: 1e3, suffix: 'K' },
]

export function formatNumber(n) {
  for (const { threshold, suffix } of SUFFIXES) {
    if (Math.abs(n) >= threshold) {
      const val = n / threshold
      return val % 1 === 0 ? `${val}${suffix}` : `${val.toFixed(1)}${suffix}`
    }
  }
  return String(n)
}

export function formatTenths(n) {
  for (const { threshold, suffix } of SUFFIXES) {
    if (Math.abs(n) >= threshold) {
      return `${(n / threshold).toFixed(1)}${suffix}`
    }
  }
  return n.toFixed(1)
}

export function formatCash(n) {
  return `$${formatNumber(n)}`
}

export function formatDelta(n, tenths = false) {
  const fmt = tenths ? formatTenths : formatNumber
  if (n > 0) return `+${fmt(n)}`
  return fmt(n)
}
