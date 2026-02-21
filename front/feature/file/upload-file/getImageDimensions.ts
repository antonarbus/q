export const getImageDimensions = async (
  src: string,
): Promise<{ width: number; height: number }> => {
  const imgDimensionsDeferred = Promise.withResolvers<{
    width: number
    height: number
  }>()

  const img = new window.Image()

  img.onload = (): void => {
    imgDimensionsDeferred.resolve({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
  }

  img.onerror = (): void => {
    imgDimensionsDeferred.resolve({ width: 0, height: 0 })
  }

  img.src = src

  return imgDimensionsDeferred.promise
}
