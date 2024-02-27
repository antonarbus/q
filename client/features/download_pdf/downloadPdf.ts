import { getState } from '@lib_instances/store'
import { domToPng } from 'modern-screenshot'
import { quotationSignal } from '@client/entities/quotation'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { className } from '@shared/consts/className'

export const downloadPdf = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'pdf' })

  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return

  const screenshot = await domToPng(itemsElement, {
    backgroundColor: 'grey',
    onCloneNode: (node) => {
      if (!(node instanceof HTMLElement)) return
      const actionsElements = node.querySelectorAll(`.${className.actionsContainer}`)
      actionsElements.forEach((element) => {
        element.remove()
      })
    },
  })

  const worker = new Worker(new URL('./pdfWorker', import.meta.url), { type: 'module' })

  worker.postMessage({
    imageData: screenshot,
    width: itemsElement.clientWidth,
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
    URL.revokeObjectURL(pdfDataUrl) // Revoke the data URL to free up resources

    showSuccessNavIcon({ navMenuItemIdKey: 'pdf' })
  }

  worker.onerror = function () {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
