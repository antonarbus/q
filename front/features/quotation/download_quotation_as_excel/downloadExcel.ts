import { getState } from '@shared/lib/redux'
import type { WorkerResponseMessage } from './excelWorker'

export type WorkerRequestMessage = {
  msg: 'send me excel'
}

export const downloadExcel = (): void => {
  const worker = new Worker(new URL('./excelWorker', import.meta.url), {
    type: 'module',
  })

  const workerRequestMessage: WorkerRequestMessage = {
    msg: 'send me excel',
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
  }
}
