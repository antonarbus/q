import type { Quotation } from '@back/entities/quotation/quotationSchema'
export type WorkerResponseMessage = {
  excelBlob: Blob
}

export type WorkerRequestMessage = {
  msg: 'send me excel'
  quotation: Quotation
}
