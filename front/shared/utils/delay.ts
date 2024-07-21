export const syncDelay = (ms = 1000): void => {
  const end = Date.now() + ms
  // eslint-disable-next-line no-continue
  while (Date.now() < end) continue
}

export const asyncDelay = async (ms = 1000): Promise<string> => {
  const { promise, resolve } = Promise.withResolvers<string>()

  setTimeout(() => {
    resolve(`delayed with ${String(ms)} ms`)
  }, ms)

  return promise
}
