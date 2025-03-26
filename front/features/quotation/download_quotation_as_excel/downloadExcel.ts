import type { WorkerResponseMessage } from './excelWorker'
import { createLoadingMenuIconMachine } from '@shared/nav'
import { navItemId } from '@shared/consts/navItemId'
import { createActor } from 'xstate'
import { getState } from '@shared/lib/redux'
import type { Quotation } from '@entities/quotation'
import { toast } from 'sonner'

export type WorkerRequestMessage = {
  msg: 'send me excel'
  quotation: Quotation
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemId.share,
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

  worker.onmessage = (event: MessageEvent<WorkerResponseMessage>): void => {
    const { excelBlob } = event.data
    const excelUrl = URL.createObjectURL(excelBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = excelUrl
    const quotationId = getState().quotation.id
    downloadLink.download = `quotation - ${quotationId}.xlsx`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(excelUrl)

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
