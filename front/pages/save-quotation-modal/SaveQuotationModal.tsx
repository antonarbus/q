import { useGetQuotationCategoryListQuery } from '@front/entities/quotation/api/useGetQuotationCategoryListQuery'
import {
  useLoadInitValuesIntoSaveQuotationModal,
  useLoadSaveQuotationModalWithDirectLink,
} from '@front/features/open-close/open-save-quotation-modal'
import { useSaveQuotation } from '@front/features/quotation/save-quotation/useSaveQuotation'
import { FormModal } from '@front/shared/component/FormModal'
import { CategoryField } from '@front/shared/component/input-field/CategoryField'
import { DescriptionField } from '@front/shared/component/input-field/DescriptionField'
import { InfoField } from '@front/shared/component/input-field/InfoField'
import { NameField } from '@front/shared/component/input-field/NameField'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { MdSaveAlt } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { QuotationPreviewField } from './QuotationPreviewField'
import { useQuotationSaveFormValues } from './useQuotationSaveFormValues'

export const SaveQuotationModal = (): React.JSX.Element => {
  const isQuotationsPage = useLocation().pathname.includes(route.quotationList)
  const animatedElement = useAnimatedElement()
  const saveQuotationFormValues = useQuotationSaveFormValues()
  useLoadInitValuesIntoSaveQuotationModal({ saveQuotationFormValues })
  useLoadSaveQuotationModalWithDirectLink({ saveQuotationFormValues })

  const saveQuotation = useSaveQuotation({
    saveQuotationFormValues,
    slideOut: animatedElement.slideOut,
  })

  const navigateUp = (): void => {
    routerHolder.router.navigate('..')
  }

  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()

  const distinctCategoryList =
    getQuotationCategoryListQuery.data?.distinctQuotationCategoryList ?? []

  return (
    <FormModal
      buttonText={isQuotationsPage === true ? 'Update' : 'Save'}
      headerIcon={<MdSaveAlt />}
      headerText={isQuotationsPage === true ? 'Quick edit' : 'Save quotation'}
      isButtonError={saveQuotation.isError}
      isButtonLoading={saveQuotation.isPending}
      isButtonSuccess={saveQuotation.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={saveQuotation.handleSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
      width='500px'
    >
      <NameField nameSignal={saveQuotationFormValues.nameSignal} />
      <CategoryField
        categorySignal={saveQuotationFormValues.categorySignal}
        options={distinctCategoryList}
      />
      <DescriptionField descSignal={saveQuotationFormValues.descSignal} />
      <InfoField infoSignal={saveQuotationFormValues.infoSignal} />
      {isQuotationsPage === true ? <QuotationPreviewField /> : null}
    </FormModal>
  )
}
