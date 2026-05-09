let deferred = Promise.withResolvers()

export const getClipboardPreviewPreparingPromise = async (): Promise<unknown> => {
  deferred = Promise.withResolvers()
  return await deferred.promise
}

export const resolveClipboardPreviewPreparingPromise = (): void => {
  deferred.resolve()
}
