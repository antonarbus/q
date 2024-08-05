import { getState } from '@lib_instances/store'
import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { ShareField } from './ShareField'
import { QuotationField } from './QuotationField'
import {
  useFixScrollPositionOnModalOpen,
  useLoadInitValuesIntoQuotationModal,
  useLoadQuotationModalWithDirectLink,
} from '@features/open_close/open_quotation_modal'
import { useQuotationFormValues } from './useFormValues'
import { useIsButtonDisabled } from './useIsButtonDisabled'

export const QuotationModal = (): JSX.Element => {
  useFixScrollPositionOnModalOpen()
  const modalRef = useRef<HTMLDivElement>(null)
  const { quotationFormValues } = useQuotationFormValues()
  useLoadInitValuesIntoQuotationModal({ quotationFormValues })

  // todo: now the quotation is loaded in quotationSlice to show details for modal
  // todo: it makes main quotation reload with prev version
  // todo: issue should go away as we start to use different slice for it
  useLoadQuotationModalWithDirectLink({ quotationFormValues })
  const isButtonDisabled = useIsButtonDisabled({ quotationFormValues })
  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({
    modalRef,
    quotationFormValues,
  })

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerText={`${getState().quotation.id === 'new' ? 'Save' : 'Update'} quotation`}
      headerIcon={<MdSaveAlt />}
      buttonText={getState().quotation.id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={isButtonDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={quotationFormValues.nameSignal} />
      <CategoryField categorySignal={quotationFormValues.categorySignal} />
      <DescriptionField descSignal={quotationFormValues.descSignal} />
      <InfoField infoSignal={quotationFormValues.infoSignal} />
      <ShareField
        shareWithOptionSignal={quotationFormValues.shareWithOptionSignal}
        sharedWithSignal={quotationFormValues.sharedWithSignal}
      />
      <QuotationField />
    </FormModal>
  )
}
