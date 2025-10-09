import { stripHtmlWithBreaksPreserve } from '@shared/util/stripHtmlWithBreaksPreserve'
import striptags from 'striptags'
import type { WorkerRequestMessage } from './downloadExcel'

export type WorkerResponseMessage = {
  excelBlob: Blob
}

self.onmessage = async (
  event: MessageEvent<WorkerRequestMessage>,
): Promise<void> => {
  const { quotation } = event.data

  // www.npmjs.com/package/exceljs#contents
  const ExcelJS = await import('exceljs')
  const workbook = new ExcelJS.Workbook()

  const worksheet = workbook.addWorksheet(`Quotation ${quotation.id}`)

  let excelRowNumber = 1
  let rowBlockNumber = 1

  for (const block of quotation.blocks) {
    if (block.type === 'text') {
      const text = stripHtmlWithBreaksPreserve(block.text.html)
      // Split text into lines and write each line to a new row
      const lines = text.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        worksheet.getCell(`A${excelRowNumber}`).value = line
        excelRowNumber = excelRowNumber + 1
      }
    }

    if (block.type === 'boq') {
      worksheet.getCell(`A${excelRowNumber}`).value = striptags(
        block.boq.header.title.html,
      )

      excelRowNumber = excelRowNumber + 1

      worksheet.getCell(`B${excelRowNumber}`).value = striptags(
        block.boq.column.description.html,
      )

      worksheet.getCell(`C${excelRowNumber}`).value = striptags(
        block.boq.column.itemPrice.html,
      )

      worksheet.getCell(`D${excelRowNumber}`).value = striptags(
        block.boq.column.qty.html,
      )

      worksheet.getCell(`E${excelRowNumber}`).value = striptags(
        block.boq.column.price.html,
      )

      excelRowNumber = excelRowNumber + 1

      let rowBoqNumber = 1

      for (const row of block.boq.rows) {
        worksheet.getCell(`A${excelRowNumber}`).value =
          `${rowBlockNumber}.${rowBoqNumber}`

        worksheet.getCell(`B${excelRowNumber}`).value =
          stripHtmlWithBreaksPreserve(row.description.html)

        worksheet.getCell(`C${excelRowNumber}`).value = striptags(
          row.itemPrice.html,
        )

        worksheet.getCell(`D${excelRowNumber}`).value = striptags(row.qty.html)

        worksheet.getCell(`E${excelRowNumber}`).value = striptags(
          row.price.html,
        )

        excelRowNumber = excelRowNumber + 1
        rowBoqNumber = rowBoqNumber + 1
      }

      rowBlockNumber = rowBlockNumber + 1
    }

    if (block.type === 'price') {
      worksheet.getCell(`A${excelRowNumber}`).value = striptags(
        block.title.html,
      )

      excelRowNumber = excelRowNumber + 1

      worksheet.getCell(`A${excelRowNumber}`).value = striptags(
        block.price.html,
      )

      excelRowNumber = excelRowNumber + 1
    }

    excelRowNumber = excelRowNumber + 1
  }

  const buffer = await workbook.xlsx.writeBuffer()

  const excelBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const workerResponseMessage: WorkerResponseMessage = { excelBlob }

  self.postMessage(workerResponseMessage)
}
