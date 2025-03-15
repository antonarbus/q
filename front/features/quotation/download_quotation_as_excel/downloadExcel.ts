import { getState } from '@shared/lib/redux'
import type { WorkerResponseMessage } from './excelWorker'
import { createLoadingMenuIconMachine } from '@shared/nav'
import { navItemKey } from '@shared/consts/navItemKey'
import { createActor } from 'xstate'

export type WorkerRequestMessage = {
  msg: 'send me excel'
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemKey.excel,
})

const excelLoadingIconActor = createActor(loadingMenuIconMachine).start()

export const downloadExcel = (): void => {
  excelLoadingIconActor.send({ type: 'show loading icon' })

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

    setTimeout(() => {
      excelLoadingIconActor.send({ type: 'show success icon' })
    }, 1000)
  }

  worker.onerror = (): void => {
    setTimeout(() => {
      excelLoadingIconActor.send({ type: 'show error icon' })
    }, 1000)
  }
}
