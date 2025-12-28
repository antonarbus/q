export const asyncDelay = async (ms = 1000): Promise<string> => {
  const waitDeferred = Promise.withResolvers<string>()

  setTimeout(() => {
    waitDeferred.resolve(`delayed with ${String(ms)} ms`)
  }, ms)

  const result = await waitDeferred.promise

  return result
}
