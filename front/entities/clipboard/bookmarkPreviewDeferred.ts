let deferred = Promise.withResolvers()

export const getPreviewPreparingPromise = async (): Promise<unknown> => {
  deferred = Promise.withResolvers()
  return await deferred.promise
}

export const resolvePreviewPreparingPromise = (): void => {
  deferred.resolve()
}
