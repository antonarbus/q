export const getImageDimensions = async (
  src: string,
): Promise<{ width: number; height: number }> => {
  const imgDimensionsDeferred = Promise.withResolvers<{
    width: number
    height: number
  }>()

  const img = new globalThis.Image()

  img.addEventListener('load', () => {
    imgDimensionsDeferred.resolve({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
  })

  img.addEventListener('error', () => {
    imgDimensionsDeferred.resolve({ width: 0, height: 0 })
  })

  img.src = src

  // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
  // oxlint-disable-next-line typescript/return-await
  return await imgDimensionsDeferred.promise
}
