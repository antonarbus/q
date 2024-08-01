export { OpenQuotationModalButton } from './OpenQuotationModalButton'
export { useLoadInitValuesIntoQuotationModal } from './useLoadInitValuesIntoQuotationModal'
export { useLoadQuotationModalWithDirectLink } from './useLoadQuotationModalWithDirectLink'
export { openSaveQuotationModal } from './openSaveQuotationModal'
export { useFixScrollPositionOnModalOpen } from './useFixScrollPositionOnModalOpen'

export type OpenQuotationModalNavigateState = {
  navigatedFrom: string
  navigateTo: string
  scrollTop: number
}
