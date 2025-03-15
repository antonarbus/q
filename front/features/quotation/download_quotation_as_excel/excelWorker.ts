import type { WorkerRequestMessage } from './downloadExcel'

export type WorkerResponseMessage = {
  excelBlob: Blob
}

self.onmessage = async (
  event: MessageEvent<WorkerRequestMessage>,
): Promise<void> => {
  const ExcelJS = await import('exceljs')
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')
  worksheet.getCell('A1').value = 'Under development'
  const buffer = await workbook.xlsx.writeBuffer()

  const excelBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const workerResponseMessage: WorkerResponseMessage = { excelBlob }

  self.postMessage(workerResponseMessage)
}
