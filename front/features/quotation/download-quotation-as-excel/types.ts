import type { Quotation } from '@root/shared/types/Quotation'
export type WorkerResponseMessage = {
  excelBlob: Blob
}

export type WorkerRequestMessage = {
  msg: 'send me excel'
  quotation: Quotation
}
