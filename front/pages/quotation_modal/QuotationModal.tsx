import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components/FormModal'
import { ShareField } from './ShareField'
import { QuotationField } from './QuotationField'
import {
  useLoadInitValuesIntoQuotationModal,
  useLoadQuotationModalWithDirectLink,
} from '@features/open_close/open_quotation_modal'
import { useQuotationFormValues } from './useFormValues'
import { useIsButtonDisabled } from './useIsButtonDisabled'
import { NameField } from '@shared/components/input_fields/NameField'
import { CategoryField } from '@shared/components/input_fields/CategoryField'
import { DescriptionField } from '@shared/components/input_fields/DescriptionField'
import { InfoField } from '@shared/components/input_fields/InfoField'
import { useGetQuotationCategoriesQuery } from '@entities/quotation'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'

export const QuotationModal = (): React.JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const { quotationFormValues } = useQuotationFormValues()
  useLoadInitValuesIntoQuotationModal({ quotationFormValues })
  useLoadQuotationModalWithDirectLink({ quotationFormValues })
  const isButtonDisabled = useIsButtonDisabled({ quotationFormValues })

  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({
    quotationFormValues,
    slideOut,
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  const { data } = useGetQuotationCategoriesQuery()
  const options = (data?.categories ?? []).filter((cat) => cat !== undefined)

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerText='Save quotation'
      headerIcon={<MdSaveAlt />}
      buttonText='Save'
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
      <NameField
        nameSignal={quotationFormValues.nameSignal}
        required
      />
      <CategoryField
        categorySignal={quotationFormValues.categorySignal}
        options={options}
        required
      />
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
