export { OpenQuotationModalButton } from './OpenQuotationModalButton'
export { useLoadInitValuesIntoQuotationModal } from './useLoadInitValuesIntoQuotationModal'
export { useLoadQuotationModalWithDirectLink } from './useLoadQuotationModalWithDirectLink'
export { openQuotationModal } from './openQuotationModal'
export { useFixScrollPositionOnModalOpen } from './useFixScrollPositionOnModalOpen'

export type OpenQuotationModalNavigateState = {
  navigatedFrom?: string | null
  navigateTo?: string | null
  scrollTop?: number | null
} | null
