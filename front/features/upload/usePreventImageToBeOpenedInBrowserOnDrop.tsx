import { useEffectOnce } from 'react-use'

export const usePreventImageToBeOpenedInBrowserOnDrop = (): void => {
  useEffectOnce(() => {
    document.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    document.addEventListener('drop', (e) => {
      e.preventDefault()
    })
  })
}
