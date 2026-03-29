export const getImageDimensions = async (
  src: string,
): Promise<{ width: number; height: number }> => {
  const imgDimensionsDeferred = Promise.withResolvers<{
    width: number
    height: number
  }>()

  const img = new window.Image()

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

  return await imgDimensionsDeferred.promise
}
