export const syncDelay = (ms = 1000): void => {
  const end = Date.now() + ms

  while (Date.now() < end) {
    // eslint-disable-next-line no-continue
    continue
  }
}

export const asyncDelay = async (ms = 1000): Promise<string> => {
  const { promise, resolve } = Promise.withResolvers<string>()

  setTimeout(() => {
    resolve(`delayed with ${String(ms)} ms`)
  }, ms)

  return promise
}
