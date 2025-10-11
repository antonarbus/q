import {
  useLoadInitValuesIntoShareQuotationModal,
  useLoadShareQuotationModalWithDirectLink,
} from '@features/open-close/open-share-quotation-modal'
import { useShareQuotation } from '@features/quotation/share-quotation'
import { FormModal } from '@shared/component/FormModal'
import { router } from '@shared/lib/react-router-dom/router'
import { getState } from '@shared/lib/redux'
import { useSlide } from '@shared/util/useSlide'
import type { JSX } from 'react'
import { ImLink } from 'react-icons/im'
import { ShareQuotationField } from './share-quotation-field/ShareQuotationField'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { useShareQuotationFormValues } from './useShareQuotationFormValues'

export const ShareQuotationModal = (): JSX.Element => {
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
