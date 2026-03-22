import {
  useLoadInitValuesIntoShareQuotationModal,
  useLoadShareQuotationModalWithDirectLink,
} from '@front/features/open-close/open-share-quotation-modal'
import { useShareQuotation } from '@front/features/quotation/share-quotation/useShareQuotation'
import { FormModal } from '@front/shared/component/FormModal'
import { router } from '@front/shared/lib/react-router-dom/router'
import { getState } from '@front/shared/lib/redux'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { ImLink } from 'react-icons/im'
import { ShareQuotationField } from './share-quotation-field'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { useShareQuotationFormValues } from './useShareQuotationFormValues'

export const ShareQuotationModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const accessFormValuesSignal = useShareQuotationFormValues()
  useLoadInitValuesIntoShareQuotationModal({ accessFormValuesSignal })
  useLoadShareQuotationModalWithDirectLink({ accessFormValuesSignal })
  const isButtonDisabled = useIsButtonDisabled({ accessFormValuesSignal })
  const isNewQuotation = getState().quotation.id === 'new'

  const shareQuotation = useShareQuotation({
    accessFormValuesSignal,
    slideOut: animatedElement.slideOut,
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
      isButtonError={shareQuotation.isError}
      isButtonLoading={shareQuotation.isPending}
      isButtonSuccess={shareQuotation.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={shareQuotation.handleSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='500px'
    >
      <ShareQuotationField accessFormValuesSignal={accessFormValuesSignal} />
    </FormModal>
  )
}
