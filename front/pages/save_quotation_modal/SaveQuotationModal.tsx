import { MdSaveAlt } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components/FormModal'
import { QuotationPreviewField } from './QuotationPreviewField'
import {
  useLoadInitValuesIntoSaveQuotationModal,
  useLoadSaveQuotationModalWithDirectLink,
} from '@features/open_close/open_save_quotation_modal'
import { useQuotationSaveFormValues } from './useQuotationSaveFormValues'
import { NameField } from '@shared/components/input_fields/NameField'
import { CategoryField } from '@shared/components/input_fields/CategoryField'
import { DescriptionField } from '@shared/components/input_fields/DescriptionField'
import { InfoField } from '@shared/components/input_fields/InfoField'
import { useGetQuotationCategoriesQuery } from '@entities/quotation'
import { router } from '@shared/lib/router'
import { useSlide } from '@shared/utils/useSlide'
import { useLocation } from 'react-router-dom'
import { route } from '@shared/consts/route'

export const SaveQuotationModal = (): React.JSX.Element => {
  const forQuotationsPage = useLocation().pathname.includes(route.quotations)
  const { ref: modalRef, slideOut } = useSlide()
  const { saveQuotationFormValues } = useQuotationSaveFormValues()
  useLoadInitValuesIntoSaveQuotationModal({ saveQuotationFormValues })
  useLoadSaveQuotationModalWithDirectLink({ saveQuotationFormValues })

  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({
    saveQuotationFormValues,
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
      headerText={forQuotationsPage ? 'Quick edit' : 'Save quotation'}
      headerIcon={<MdSaveAlt />}
      buttonText={forQuotationsPage ? 'Update' : 'Save'}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={navigateUp}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
    >
      <NameField nameSignal={saveQuotationFormValues.nameSignal} />
      <CategoryField
        categorySignal={saveQuotationFormValues.categorySignal}
        options={options}
      />
      <DescriptionField descSignal={saveQuotationFormValues.descSignal} />
      <InfoField infoSignal={saveQuotationFormValues.infoSignal} />
      {forQuotationsPage && <QuotationPreviewField />}
    </FormModal>
  )
}
