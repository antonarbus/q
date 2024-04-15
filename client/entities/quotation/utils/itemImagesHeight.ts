import { dispatch } from '@lib_instances/store'
import { className } from '@shared/consts/className'
import { quotationSlice } from '../redux/quotationSlice'

export const unfixItemImagesHeight = (): void => {
  const itemImages = document.querySelectorAll(`.${className.item} img`)
  if (itemImages === undefined) return
  itemImages.forEach(imageElement => {
    if (!(imageElement instanceof HTMLElement)) return
    imageElement.style.height = 'auto'
  })

  dispatch(quotationSlice.actions.unfixImagesHeightReducer())
}

export const fixItemImagesHeight = (): void => {
  const itemImages = document.querySelectorAll(`.${className.item} img`)
  if (itemImages === undefined) return
  itemImages.forEach(imageElement => {
    if (!(imageElement instanceof HTMLElement)) return
    imageElement.style.height = imageElement.clientHeight + 'px'
    dispatch(quotationSlice.actions.fixImagesHeightReducer({
      imageHeight: imageElement.clientHeight,
      imageId: imageElement.id,
    }))
  })
}
