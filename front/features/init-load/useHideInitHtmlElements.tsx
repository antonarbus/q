import { cls } from '@shared/cls'
import { useEffectOnce } from 'react-use'

export const useHideInitHtmlElements = (): void => {
  useEffectOnce(() => {
    const waitElement = document.querySelector(`.${cls.waitForInitFilesToLoad}`)

    if (waitElement instanceof HTMLElement) {
      waitElement.style.display = 'none'
    }
  })
}
