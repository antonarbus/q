export const asyncDelay = async (ms = 1000): Promise<string> => {
  const { promise: delayPromise, resolve: resolveDelayPromise } =
    Promise.withResolvers<string>()

  setTimeout(() => {
    resolveDelayPromise(`delayed with ${String(ms)} ms`)
  }, ms)

  const result = await delayPromise

  return result
}
