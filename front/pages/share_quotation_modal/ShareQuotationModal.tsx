import { FormModal } from '@shared/components/FormModal'
import { ShareQuotationField } from './share_quotation_field/ShareQuotationField'
import { useShareQuotationFormValues } from './useShareQuotationFormValues'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'
import { ImLink } from 'react-icons/im'
import { useShareQuotation } from '@features/quotation/share_quotation'
import { getState } from '@shared/lib/redux'
import {
  useLoadInitValuesIntoShareQuotationModal,
  useLoadShareQuotationModalWithDirectLink,
} from '@features/open_close/open_share_quotation_modal'

export const ShareQuotationModal = (): React.JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const { accessFormValuesSignal } = useShareQuotationFormValues()
  useLoadInitValuesIntoShareQuotationModal({ accessFormValuesSignal })
  useLoadShareQuotationModalWithDirectLink({ accessFormValuesSignal })
  const isButtonDisabled = useIsButtonDisabled({ accessFormValuesSignal })
  const isNewQuotation = getState().quotation.id === 'new'

  const { onSubmit, isPending, isSuccess, isError } = useShareQuotation({
    accessFormValuesSignal,
    slideOut,
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  return (
    <FormModal
      buttonText={isNewQuotation === true ? 'Save and share' : 'Update'}
      headerIcon={<ImLink />}
      headerText='Share'
      isButtonDisabled={isButtonDisabled}
      isButtonError={isError}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      modalRef={modalRef}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='500px'
    >
      <ShareQuotationField accessFormValuesSignal={accessFormValuesSignal} />
    </FormModal>
  )
}
