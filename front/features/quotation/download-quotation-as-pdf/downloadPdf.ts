import { navItemId } from '@front/entities/nav/navItemId'
import { createLoadingMenuIconMachine } from '@front/entities/nav/state-machine/createLoadingMenuIconMachine'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux'
import { downloadBlobAsFile } from '@front/shared/util/downloadBlobAsFile'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { WorkerRequestMessage, WorkerResponseMessage } from './types'

const menuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.share,
})

const loadingIconActor = createActor(menuIconMachine).start()

export const downloadPdf = async (): Promise<void> => {
  loadingIconActor.send({ type: 'show loading icon' })

  const worker = new Worker(new URL('./pdfWorker', import.meta.url), {
    type: 'module',
  })

  const blocksContainerElement = document.querySelector(`.${cls.blocks}`)

  if (blocksContainerElement instanceof HTMLElement === false) {
    return
  }

  // get max item block width to set the width of generated pdf a bit wider to fit quotation nicely
  const paperElements = blocksContainerElement.querySelectorAll(`.${cls.paper}`)

  const maxPaperWidth =
    Array.from(paperElements).reduce((maxWidth, paperElement) => {
      const paperElementWidth = paperElement.clientWidth

      if (paperElementWidth > maxWidth) {
        return paperElementWidth
      }

      return maxWidth
    }, 0) + 40

  const modernScreenshotModule = await import('modern-screenshot')

  // Calculate height after button removal by temporarily cloning and measuring
  const tempClone = blocksContainerElement.cloneNode(true)

  if (tempClone instanceof HTMLElement === false) {
    return
  }

  tempClone.style.position = 'absolute'
  tempClone.style.left = '-9999px'
  tempClone.style.visibility = 'hidden'
  tempClone.style.width = `${maxPaperWidth}px`
  document.body.append(tempClone)

  // Remove button from temp clone to get correct height
  const tempOpenInsertMenuButton = tempClone.querySelector(`.${cls.openInsertMenuButton}`)

  if (tempOpenInsertMenuButton !== null) {
    tempOpenInsertMenuButton.remove()
  }

  // Also remove action buttons from temp clone
  const tempActionElements = tempClone.querySelectorAll(`.${cls.actionsContainer}`)

  tempActionElements.forEach((element) => {
    element.remove()
  })

  tempClone.style.display = 'inline-flex'
  tempClone.style.justifyContent = 'flex-start'

  const correctedHeight = tempClone.clientHeight

  tempClone.remove()

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

  worker.onmessage = (messageEvent: MessageEvent<WorkerResponseMessage>): void => {
    downloadBlobAsFile({
      blob: messageEvent.data.pdfBlob,
      fileName: `quotation - ${reduxHolder.getState().quotation.id}.pdf`,
    })

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
