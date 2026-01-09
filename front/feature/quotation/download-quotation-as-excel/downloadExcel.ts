import { navItemId } from '@entity/nav/navItemId'
import { createLoadingMenuIconMachine } from '@entity/nav/state-machine/createLoadingMenuIconMachine'
import { getState } from '@shared/lib/redux'
import { downloadBlobAsFile } from '@shared/util/downloadBlobAsFile'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { WorkerRequestMessage, WorkerResponseMessage } from './types'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.share,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const downloadExcel = (): void => {
  loadingIconActor.send({ type: 'show loading icon' })

  const worker = new Worker(new URL('./excelWorker', import.meta.url), {
    type: 'module',
  })

  const workerRequestMessage: WorkerRequestMessage = {
    msg: 'send me excel',
    quotation: getState().quotation,
  }

  worker.postMessage(workerRequestMessage)

  worker.onmessage = (
    messageEvent: MessageEvent<WorkerResponseMessage>,
  ): void => {
    downloadBlobAsFile({
      blob: messageEvent.data.excelBlob,
      fileName: `quotation - ${getState().quotation.id}.xlsx`,
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
