import type { WorkerRequestMessage } from './downloadExcel'
import striptags from 'striptags'

export type WorkerResponseMessage = {
  excelBlob: Blob
}

self.onmessage = async (
  event: MessageEvent<WorkerRequestMessage>,
): Promise<void> => {
  const quotation = event.data.quotation

  // www.npmjs.com/package/exceljs#contents
  const ExcelJS = await import('exceljs')
  const workbook = new ExcelJS.Workbook()

  const worksheet = workbook.addWorksheet(`Quotation ${quotation.id}`)

  let rowNumber = 1
  const rowBlockNumber = 1

  worksheet.getCell(`A${rowNumber}`).value = `Quotation ${quotation.id}`

  rowNumber = 3

  for (const block of quotation.blocks) {
    if (block.type === 'text') {
      worksheet.getCell(`A${rowNumber}`).value = striptags(block.text.html)
    }

    if (block.type === 'boq') {
      worksheet.getCell(`A${rowNumber}`).value = striptags(
        block.boq.header.title.html,
      )

      rowNumber++

      let rowBoqNumber = 1

      for (const row of block.boq.rows) {
        worksheet.getCell(`A${rowNumber}`).value =
          `${rowBlockNumber}.${rowBoqNumber}`

        worksheet.getCell(`B${rowNumber}`).value = striptags(
          row.description.html,
        )

        worksheet.getCell(`C${rowNumber}`).value = striptags(row.itemPrice.html)

        worksheet.getCell(`D${rowNumber}`).value = striptags(row.qty.html)

        worksheet.getCell(`E${rowNumber}`).value = striptags(row.price.html)

        rowNumber++
        rowBoqNumber++
      }
    }

    if (block.type === 'price') {
      worksheet.getCell(`A${rowNumber}`).value = striptags(block.title.html)
      rowNumber++
      worksheet.getCell(`A${rowNumber}`).value = striptags(block.price.html)
      rowNumber++
    }

    rowNumber += 2
  }

  const buffer = await workbook.xlsx.writeBuffer()

  const excelBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const workerResponseMessage: WorkerResponseMessage = { excelBlob }

  self.postMessage(workerResponseMessage)
}
