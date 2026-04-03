import { navItemId } from '@front/entities/nav/navItemId'
import { createLoadingMenuIconMachine } from '@front/entities/nav/state-machine/createLoadingMenuIconMachine'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { downloadBlobAsFile } from '@front/shared/util/downloadBlobAsFile'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { WorkerRequestMessage, WorkerResponseMessage } from './types'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.share,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const downloadExcel = (): void => {
  loadingIconActor.send({ type: 'show loading icon' })

  const worker = new Worker(new URL('excelWorker', import.meta.url), {
    type: 'module',
  })

  const workerRequestMessage: WorkerRequestMessage = {
    msg: 'send me excel',
    quotation: reduxHolder.getState().quotation,
  }

  worker.postMessage(workerRequestMessage)

  worker.addEventListener('message', (messageEvent: MessageEvent<WorkerResponseMessage>): void => {
    downloadBlobAsFile({
      blob: messageEvent.data.excelBlob,
      fileName: `quotation - ${reduxHolder.getState().quotation.id}.xlsx`,
    })

    setTimeout(() => {
      loadingIconActor.send({ type: 'show success icon' })
      toast.info('File downloaded')
    }, 1000)
  })

  worker.addEventListener('error', (): void => {
    setTimeout(() => {
      loadingIconActor.send({ type: 'show error icon' })
      toast.error('Error downloading file')
    }, 1000)
  })
}
