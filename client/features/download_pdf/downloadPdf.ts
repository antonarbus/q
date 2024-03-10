import { domToJpeg } from 'modern-screenshot'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { quotationSignal } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { navMenuItemId } from '@shared/consts/navMenuItemId'

export const downloadPdf = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: navMenuItemId.pdf })

  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return

  const paperElements = document.querySelectorAll(`.${className.paper}`)
  if (paperElements === null) return

  const maxPaperWidth = Array.from(paperElements).reduce((maxWidth, paperElement) => {
    const paperElementWidth = paperElement.clientWidth
    if (paperElementWidth > maxWidth) return paperElementWidth
    return maxWidth
  }, 0) + 40

  const screenshot = await domToJpeg(itemsElement, {
    width: maxPaperWidth,
    height: itemsElement.clientHeight,
    backgroundColor: 'grey',
    quality: 1,
    scale: 1.5,
    onCloneNode: (node) => {
      if (!(node instanceof HTMLElement)) return
      const actionElements = node.querySelectorAll(`.${className.actionsContainer}`)
      actionElements.forEach((element) => { element.remove() })
    },
  })

  const worker = new Worker(new URL('./pdfWorker', import.meta.url), { type: 'module' })

  worker.postMessage({
    imageData: screenshot,
    width: maxPaperWidth,
    height: itemsElement.clientHeight,
  })

  worker.onmessage = function (event: MessageEvent<Blob>) {
    const blobImage = event.data
    const pdfDataUrl = URL.createObjectURL(blobImage)
    const downloadLink = document.createElement('a')
    downloadLink.href = pdfDataUrl
    const quotationId = quotationSignal.value.id
    downloadLink.download = `quotation - ${quotationId}.pdf`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(pdfDataUrl) // revoke the data URL to free up resources
    showSuccessNavIcon({ navMenuItemIdKey: navMenuItemId.pdf })
  }

  worker.onerror = function () {
    showErrorNavIcon({ navMenuItemIdKey: navMenuItemId.pdf })
  }
}
