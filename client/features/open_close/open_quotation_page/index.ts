export { OpenQuotationPageAndLoadFromServerButton } from './OpenQuotationPageAndLoadFromServerButton'
export { openQuotationPageAndLoadNew } from './openQuotationPageAndLoadNew'
export { openQuotationPageAndLoadPrev } from './openQuotationPageAndLoadPrev'

export type QuotationLocationState =
  | {
      quotationType: 'new' | 'previous' | 'server'
    }
  | undefined
