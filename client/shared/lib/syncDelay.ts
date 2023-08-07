export const syncDelay = (ms = 1000): void => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}
