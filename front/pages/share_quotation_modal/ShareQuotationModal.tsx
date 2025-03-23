import { FormModal } from '@shared/components/FormModal'
import { ShareQuotationField } from './ShareQuotationField'
import { useShareQuotationFormValues } from './useShareQuotationFormValues'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'
import { ImLink } from 'react-icons/im'
import {
  useLoadInitValuesIntoShareQuotationModal,
  useLoadShareQuotationModalWithDirectLink,
} from '@features/open_close/open_share_quotation_modal'
import { useShareQuotation } from '@features/quotation/share_quotation'
import { getState } from '@shared/lib/redux'

export const ShareQuotationModal = (): React.JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const { shareQuotationFormValues } = useShareQuotationFormValues()
  useLoadInitValuesIntoShareQuotationModal({ shareQuotationFormValues })
  useLoadShareQuotationModalWithDirectLink({ shareQuotationFormValues })
  const isButtonDisabled = useIsButtonDisabled({ shareQuotationFormValues })
  const isNewQuotation = getState().quotation.id === 'new'

  const { onSubmit, isPending, isSuccess, isError } = useShareQuotation({
    shareQuotationFormValues,
    slideOut,
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerText='Share quotation'
      headerIcon={<ImLink />}
      buttonText={isNewQuotation ? 'Save and share' : 'Update'}
      isButtonDisabled={isButtonDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={navigateUp}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
    >
      <ShareQuotationField
        shareWithOptionSignal={shareQuotationFormValues.shareWithOptionSignal}
        sharedWithSignal={shareQuotationFormValues.sharedWithSignal}
      />
    </FormModal>
  )
}
