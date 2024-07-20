import { dispatch } from '@lib_instances/store'
import { cls } from '@shared/consts/cls'
import { quotationSlice } from '../redux/quotationSlice'

export const fixImagesHeight = (): void => {
  const images = document.querySelectorAll(`.${cls.block} img`)

  images.forEach((imageElement) => {
    if (!(imageElement instanceof HTMLElement)) return

    imageElement.style.height = `${String(imageElement.clientHeight)}px`

    dispatch(
      quotationSlice.actions.fixImagesHeightReducer({
        imageHeight: imageElement.clientHeight,
        imageId: imageElement.id,
      }),
    )
  })
}

export const unfixImagesHeight = (): void => {
  const images = document.querySelectorAll(`.${cls.block} img`)

  images.forEach((imageElement) => {
    if (!(imageElement instanceof HTMLElement)) return

    imageElement.style.height = 'auto'
  })

  dispatch(quotationSlice.actions.unfixImagesHeightReducer())
}
