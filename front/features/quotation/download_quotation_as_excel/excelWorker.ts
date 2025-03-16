import type { WorkerRequestMessage } from './downloadExcel'

export type WorkerResponseMessage = {
  excelBlob: Blob
}

self.onmessage = async (
  event: MessageEvent<WorkerRequestMessage>,
): Promise<void> => {
  const quotation = event.data.quotation

  const ExcelJS = await import('exceljs')
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(`Quotation ${quotation.id}`)

  worksheet.getCell('A1').value = 'Under development'

  let rowNumber = 2

  for (const block of quotation.blocks) {
    if (block.type === 'text') {
      worksheet.getCell(`A${rowNumber}`).value = 'text block'
      rowNumber++
    }

    if (block.type === 'boq') {
      worksheet.getCell(`A${rowNumber}`).value = 'boq block'
      rowNumber++

      for (const row of block.boq.rows) {
        worksheet.getCell(`A${rowNumber}`).value = 'row'
        rowNumber++
      }
    }

    if (block.type === 'price') {
      worksheet.getCell(`A${rowNumber}`).value = 'price block'
      rowNumber++
    }
  }

  const buffer = await workbook.xlsx.writeBuffer()

  const excelBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const workerResponseMessage: WorkerResponseMessage = { excelBlob }

  self.postMessage(workerResponseMessage)
}
