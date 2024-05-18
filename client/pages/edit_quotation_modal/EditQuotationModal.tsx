import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditQuotation } from '@features/quotation/edit_quotation'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'
import { QuotationField } from './QuotationField'

export const EditQuotationModal = (): JSX.Element => {
  const quotation = getState().quotation

  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(quotation?.name ?? '')
  const categorySignal = useSignal(quotation?.category ?? '')
  const descSignal = useSignal(quotation?.desc ?? '')
  const { onSubmit, isPending, isSuccess, isError } = useEditQuotation({ modalRef, nameSignal, categorySignal, descSignal })
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit quotation'
      buttonText='UPDATE'
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      modalRef={modalRef}
      onCloseSlideModalOutAndNavigateUp={true}
      onSubmit={onSubmit}
    >
      <NameField nameSignal={nameSignal}/>
      <CategoryField categorySignal={categorySignal}/>
      <DescriptionField descSignal={descSignal} />
      <QuotationField />
    </FormModal>
  )
}
