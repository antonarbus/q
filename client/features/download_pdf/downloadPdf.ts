import { dispatch } from '@lib_instances/store'
import html2canvas from 'html2canvas'
import { navSlice } from '@entities/nav'
import { className } from '@shared/consts/className'

export const downloadPdf = async (): Promise<void> => {
  dispatch(navSlice.actions.showLoadingIcon({ id: 'pdf' }))
  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return
  const worker = new Worker(new URL('./pdfWorker', import.meta.url), {
    type: 'module',
  })

  const width = itemsElement.clientWidth
  const height = itemsElement.clientHeight
  const canvas = await html2canvas(itemsElement, {
    allowTaint: true,
    useCORS: true,
    ignoreElements: (element) => {
      if (element.classList.contains(className.actionsContainer)) return true
      return false
    },
    onclone: (document: Document, element: HTMLElement) => {
      const paperElements = element.querySelectorAll(`.${className.paper}`)
      paperElements.forEach(paperElement => {
        if (!(paperElement instanceof HTMLElement)) return
        paperElement.style.border = '1px solid grey'
      })
    },
  })
  const base64image = canvas.toDataURL('image/png')
  worker.postMessage({ base64image, width, height })

  worker.onmessage = function (event: MessageEvent<Blob>) {
    const pdfDataUrl = URL.createObjectURL(event.data)
    const downloadLink = document.createElement('a')
    downloadLink.href = pdfDataUrl
    downloadLink.download = 'quotation.pdf'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(pdfDataUrl) // Revoke the data URL to free up resources
    dispatch(navSlice.actions.hideLoadingIcon({ id: 'pdf' }))
  }
}
