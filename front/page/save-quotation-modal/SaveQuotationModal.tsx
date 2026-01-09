import { useGetQuotationCategoryListQuery } from '@entity/quotation/api/useGetQuotationCategoryListQuery'
import {
  useLoadInitValuesIntoSaveQuotationModal,
  useLoadSaveQuotationModalWithDirectLink,
} from '@feature/open-close/open-save-quotation-modal'
import { useSaveQuotation } from '@feature/quotation/save-quotation'
import { FormModal } from '@shared/component/FormModal'
import { CategoryField } from '@shared/component/input-field/CategoryField'
import { DescriptionField } from '@shared/component/input-field/DescriptionField'
import { InfoField } from '@shared/component/input-field/InfoField'
import { NameField } from '@shared/component/input-field/NameField'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import type { JSX } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { QuotationPreviewField } from './QuotationPreviewField'
import { useQuotationSaveFormValues } from './useQuotationSaveFormValues'

export const SaveQuotationModal = (): JSX.Element => {
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
    void router.navigate('..')
  }

  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()

  const distinctCategoryList =
    getQuotationCategoryListQuery.data?.distinctQuotationList ?? []

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
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
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
