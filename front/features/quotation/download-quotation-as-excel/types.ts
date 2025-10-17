import type { Quotation } from '@entities/quotation/type'

export type WorkerResponseMessage = {
  excelBlob: Blob
}

export type WorkerRequestMessage = {
  msg: 'send me excel'
  quotation: Quotation
}
