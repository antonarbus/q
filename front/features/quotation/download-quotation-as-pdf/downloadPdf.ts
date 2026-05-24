import { navItemId } from '@front/shared/nav/navItemId'
import { createLoadingMenuIconMachine } from '@front/shared/nav/state-machine/createLoadingMenuIconMachine'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { downloadBlobAsFile } from '@front/shared/util/downloadBlobAsFile'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { WorkerRequestMessage, WorkerResponseMessage } from './types'

const menuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.download,
})

const loadingIconActor = createActor(menuIconMachine).start()

export const downloadPdf = async (): Promise<void> => {
  loadingIconActor.send({ type: 'show loading icon' })

  const worker = new Worker(new URL('pdfWorker', import.meta.url), {
    type: 'module',
  })

  const blocksContainerElement = document.querySelector(`.${cls.blocks}`)

  if (blocksContainerElement instanceof HTMLElement === false) {
    return
  }

  // get max item block width to set the width of generated pdf a bit wider to fit quotation nicely
  const paperElements = blocksContainerElement.querySelectorAll(`.${cls.paper}`)

  const maxPaperWidth =
    [...paperElements].reduce((maxWidth, paperElement) => {
      const paperElementWidth = paperElement.clientWidth

      if (paperElementWidth > maxWidth) {
        return paperElementWidth
      }

      return maxWidth
    }, 0) + 40

  const modernScreenshotModule = await import('modern-screenshot')

  // scrollHeight captures the full content height of the live element — modern-screenshot
  // uses this to size the SVG foreignObject, so passing anything smaller crops the bottom blocks
  const correctedHeight = blocksContainerElement.scrollHeight

  const quotationScreenshot = await modernScreenshotModule.domToJpeg(blocksContainerElement, {
    width: maxPaperWidth,
    height: correctedHeight,
    backgroundColor: 'grey',
    quality: 1,
    scale: 1.5,
    onCloneNode: (blocksElement) => {
      if (blocksElement instanceof HTMLElement === false) {
        return
      }

      blocksElement.style.display = 'inline-flex'
      blocksElement.style.justifyContent = 'flex-start'

      // remove '+' button at the bottom
      const openInsertMenuButtonElement = blocksElement.querySelector(
        `.${cls.openInsertMenuButton}`,
      )

      if (openInsertMenuButtonElement !== null) {
        openInsertMenuButtonElement.remove()
      }

      // remove buttons to the right and to the left from item block and row
      const actionElements = blocksElement.querySelectorAll(`.${cls.actionsContainer}`)

      actionElements.forEach((element) => {
        element.remove()
      })

      const paperElementList = blocksElement.querySelectorAll(`.${cls.paper}`)

      // Remove liquid glass from .pdf
      paperElementList.forEach((paperElement) => {
        if (paperElement instanceof HTMLElement === true) {
          paperElement.style.backgroundColor = 'white'
        }
      })
    },
  })

  const linkElements = blocksContainerElement.querySelectorAll(`.${cls.tiptapLink}`)

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
    height: correctedHeight,
    links,
  }

  worker.postMessage(workerRequestMessage)

  worker.addEventListener('message', (messageEvent: MessageEvent<WorkerResponseMessage>): void => {
    downloadBlobAsFile({
      blob: messageEvent.data.pdfBlob,
      fileName: `quotation - ${reduxHolder.getState().quotation.id}.pdf`,
    })

    setTimeout(() => {
      loadingIconActor.send({ type: 'show success icon' })
      toast.info('File downloaded')
    }, 1000)
  })

  worker.addEventListener('error', () => {
    setTimeout(() => {
      loadingIconActor.send({ type: 'show error icon' })
      toast.error('Error downloading file')
    }, 1000)
  })
}
