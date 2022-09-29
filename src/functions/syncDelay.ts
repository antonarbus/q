export function syncDelay(ms = 1000) {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}
