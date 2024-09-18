import { cls } from '@shared/consts/cls'
import { useEffectOnce } from 'react-use'

export const useHideInitHtmlElements = (): void => {
  useEffectOnce(() => {
    const seoElement = document.querySelector(`.${cls.seo}`)
    const waitElement = document.querySelector(`.${cls.waitForInitFilesToLoad}`)

    if (seoElement instanceof HTMLElement) {
      seoElement.style.display = 'none'
    }

    if (waitElement instanceof HTMLElement) {
      waitElement.style.display = 'none'
    }
  })
}
