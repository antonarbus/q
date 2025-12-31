export const asyncDelay = async (ms = 1000): Promise<string> => {
  const delayDeferred = Promise.withResolvers<string>()

  setTimeout(() => {
    delayDeferred.resolve(`delayed with ${String(ms)} ms`)
  }, ms)

  const result = await delayDeferred.promise

  return result
}
