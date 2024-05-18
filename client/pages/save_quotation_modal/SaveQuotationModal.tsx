import { getState, useSelectorTyped } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useSaveQuotation } from '@features/quotation/save_quotation'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const SaveQuotationModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(getState().quotation.name ?? '')
  const categorySignal = useSignal(getState().quotation.category ?? '')
  const descSignal = useSignal(getState().quotation.desc ?? '')
  const { onSubmit, isPending, isSuccess, isError } = useSaveQuotation({ modalRef, nameSignal, categorySignal, descSignal })
  const id = useSelectorTyped(state => state.quotation.id)
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Save quotation'
      headerIcon={<MdSaveAlt />}
      buttonText={id === 'new' ? 'SAVE' : 'UPDATE'}
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal}/>
      <CategoryField categorySignal={categorySignal}/>
      <DescriptionField descSignal={descSignal}/>
    </FormModal>
  )
}
