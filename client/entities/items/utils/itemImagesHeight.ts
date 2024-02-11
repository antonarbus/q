import { className } from '@shared/consts/className'

export const unfixItemImagesHeight = (): void => {
  console.log('unfix the height')
  const itemImages = document.querySelectorAll(`.${className.item} img`)
  if (itemImages === undefined) return
  console.log('🚀 ~ itemImages:', itemImages)
  itemImages.forEach(imageElement => {
    if (!(imageElement instanceof HTMLElement)) return
    imageElement.style.height = 'auto'
  })
}

export const fixItemImagesHeight = (): void => {
  console.log('fix the height')
  const itemImages = document.querySelectorAll(`.${className.item} img`)
  if (itemImages === undefined) return
  itemImages.forEach(imageElement => {
    if (!(imageElement instanceof HTMLElement)) return
    imageElement.style.height = imageElement.clientHeight + 'px'
  })
}
