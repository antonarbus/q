import { getState } from '@shared/lib/redux'
import { cls } from '@shared/consts/cls'
import { createActor } from 'xstate'
import type { WorkerResponseMessage } from './pdfWorker'
import { navItemId } from '@shared/consts/navItemId'
import { createLoadingMenuIconMachine } from '@shared/nav'
import { toast } from 'sonner'

export type WorkerRequestMessage = {
  imageData: string
  width: number
  height: number
  links: {
    url: string
    x: number
    y: number
    width: number
    height: number
  }[]
}

const menuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemId.share,
})

const loadingIconActor = createActor(menuIconMachine).start()

export const downloadPdf = async (): Promise<void> => {
  loadingIconActor.send({ type: 'show loading icon' })

  const worker = new Worker(new URL('./pdfWorker', import.meta.url), {
    type: 'module',
  })

  const blocksContainerElement = document.querySelector(`.${cls.blocks}`)

  if (!(blocksContainerElement instanceof HTMLElement)) {
    return
  }

  const paperElements = document.querySelectorAll(`.${cls.paper}`)

  const maxPaperWidth =
    Array.from(paperElements).reduce((maxWidth, paperElement) => {
      const paperElementWidth = paperElement.clientWidth

      if (paperElementWidth > maxWidth) {
        return paperElementWidth
      }

      return maxWidth
    }, 0) + 40

  const { domToJpeg } = await import('modern-screenshot')

  const quotationScreenshot = await domToJpeg(blocksContainerElement, {
    width: maxPaperWidth,
    height: blocksContainerElement.clientHeight,
    backgroundColor: 'grey',
    quality: 1,
    scale: 1.5,
    onCloneNode: (blocksElement) => {
      if (!(blocksElement instanceof HTMLElement)) {
        return
      }

      blocksElement.style.display = 'inline-flex'

      const actionElements = blocksElement.querySelectorAll(
        `.${cls.actionsContainer}`,
      )

      actionElements.forEach((element) => {
        element.remove()
      })
    },
  })

  const linkElements =
    blocksContainerElement.querySelectorAll('.editable-html a')

  const links: WorkerRequestMessage['links'] = []

  linkElements.forEach((linkElement) => {
    if (linkElement instanceof HTMLAnchorElement) {
      const linkRect = linkElement.getBoundingClientRect()
      const blocksContainerRect = blocksContainerElement.getBoundingClientRect()
      const offsetX = (maxPaperWidth - blocksContainerRect.width) / 2

      links.push({
        url: linkElement.href,
        x: linkRect.left - blocksContainerRect.left + offsetX,
        y: linkRect.top - blocksContainerRect.top,
        width: linkRect.width,
        height: linkRect.height,
      })
    }
  })

  const workerRequestMessage: WorkerRequestMessage = {
    imageData: quotationScreenshot,
    width: maxPaperWidth,
    height: blocksContainerElement.clientHeight,
    links,
  }

  worker.postMessage(workerRequestMessage)

  worker.onmessage = (event: MessageEvent<WorkerResponseMessage>): void => {
    const { pdfBlob } = event.data
    const pdfUrl = URL.createObjectURL(pdfBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = pdfUrl
    const quotationId = getState().quotation.id
    downloadLink.download = `quotation - ${quotationId}.pdf`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(pdfUrl)

    setTimeout(() => {
      loadingIconActor.send({ type: 'show success icon' })
      toast.info('File downloaded')
    }, 1000)
  }

  worker.onerror = (): void => {
    setTimeout(() => {
      loadingIconActor.send({ type: 'show error icon' })
      toast.error('Error downloading file')
    }, 1000)
  }
}
