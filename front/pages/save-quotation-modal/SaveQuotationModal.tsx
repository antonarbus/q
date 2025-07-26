import { MdSaveAlt } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save-quotation'
import { FormModal } from '@shared/component/FormModal'
import { QuotationPreviewField } from './QuotationPreviewField'
import {
  useLoadInitValuesIntoSaveQuotationModal,
  useLoadSaveQuotationModalWithDirectLink,
} from '@features/open-close/open-save-quotation-modal'
import { useQuotationSaveFormValues } from './useQuotationSaveFormValues'
import { NameField } from '@shared/component/input-field/NameField'
import { CategoryField } from '@shared/component/input-field/CategoryField'
import { DescriptionField } from '@shared/component/input-field/DescriptionField'
import { InfoField } from '@shared/component/input-field/InfoField'
import { useGetQuotationCategoryListQuery } from '@entities/quotation'
import { router } from '@shared/lib/react-router-dom'
import { useSlide } from '@shared/util/useSlide'
import { useLocation } from 'react-router-dom'
import { route } from '@shared/const/route'

export const SaveQuotationModal = (): React.JSX.Element => {
  const isQuotationsPage = useLocation().pathname.includes(route.quotationList)
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

  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()

  const options = (getQuotationCategoryListQuery.data?.categories ?? [])
    .filter((cat) => cat !== undefined)
    .filter((cat) => cat !== '')

  return (
    <FormModal
      buttonText={isQuotationsPage === true ? 'Update' : 'Save'}
      headerIcon={<MdSaveAlt />}
      headerText={isQuotationsPage === true ? 'Quick edit' : 'Save quotation'}
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
      <NameField nameSignal={saveQuotationFormValues.nameSignal} />
      <CategoryField
        categorySignal={saveQuotationFormValues.categorySignal}
        options={options}
      />
      <DescriptionField descSignal={saveQuotationFormValues.descSignal} />
      <InfoField infoSignal={saveQuotationFormValues.infoSignal} />
      {isQuotationsPage === true ? <QuotationPreviewField /> : null}
    </FormModal>
  )
}
