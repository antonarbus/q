import { getState } from '@shared/lib/redux'
import { domToJpeg } from 'modern-screenshot'
import { cls } from '@shared/consts/cls'
import { createActor } from 'xstate'
import { pdfLoadingIconMachine } from './pdfLoadingIconMachine'

const pdfLoadingIconActor = createActor(pdfLoadingIconMachine).start()

export const downloadPdf = async (): Promise<void> => {
  pdfLoadingIconActor.send({ type: 'show loading icon' })

  const blocksContainerElement = document.querySelector(`.${cls.blocks}`)
  if (!(blocksContainerElement instanceof HTMLElement)) return

  const paperElements = document.querySelectorAll(`.${cls.paper}`)

  const maxPaperWidth =
    Array.from(paperElements).reduce((maxWidth, paperElement) => {
      const paperElementWidth = paperElement.clientWidth
      if (paperElementWidth > maxWidth) return paperElementWidth

      return maxWidth
    }, 0) + 40

  const screenshot = await domToJpeg(blocksContainerElement, {
    width: maxPaperWidth,
    height: blocksContainerElement.clientHeight,
    backgroundColor: 'grey',
    quality: 1,
    scale: 1.5,
    onCloneNode: (blocksElement) => {
      if (!(blocksElement instanceof HTMLElement)) return
      blocksElement.style.display = 'inline-flex'

      const actionElements = blocksElement.querySelectorAll(
        `.${cls.actionsContainer}`,
      )

      actionElements.forEach((element) => {
        element.remove()
      })
    },
  })

  const worker = new Worker(new URL('./pdfWorker', import.meta.url), {
    type: 'module',
  })

  worker.postMessage({
    imageData: screenshot,
    width: maxPaperWidth,
    height: blocksContainerElement.clientHeight,
  })

  worker.onmessage = (event: MessageEvent<Blob>): void => {
    const blobImage = event.data
    const pdfDataUrl = URL.createObjectURL(blobImage)
    const downloadLink = document.createElement('a')
    downloadLink.href = pdfDataUrl
    const quotationId = getState().quotation.id
    downloadLink.download = `quotation - ${quotationId}.pdf`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(pdfDataUrl) // revoke the data URL to free up resources

    setTimeout(() => {
      pdfLoadingIconActor.send({ type: 'show success icon' })
    }, 1000)
  }

  worker.onerror = (): void => {
    setTimeout(() => {
      pdfLoadingIconActor.send({ type: 'show error icon' })
    }, 1000)
  }
}
