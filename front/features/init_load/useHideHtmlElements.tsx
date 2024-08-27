import { useEffectOnce } from 'react-use'

export const useHideHtmlElements = (): void => {
  useEffectOnce(() => {
    const seoElement = document.getElementById('seo')
    const waitElement = document.getElementById('loading')

    if (seoElement instanceof Element) {
      seoElement.style.display = 'none'
    }

    if (waitElement instanceof Element) {
      waitElement.style.display = 'none'
    }
  })
}
