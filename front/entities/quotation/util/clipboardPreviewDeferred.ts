let deferred = Promise.withResolvers()

export const getClipboardPreviewPreparingPromise = async (): Promise<unknown> => {
  deferred = Promise.withResolvers()
  // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
  // oxlint-disable-next-line typescript/return-await
  return await deferred.promise
}

export const resolveClipboardPreviewPreparingPromise = (): void => {
  deferred.resolve()
}
