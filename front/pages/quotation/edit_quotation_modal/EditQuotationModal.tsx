import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditQuotation } from '@features/quotation/edit_quotation'
import { FormModal } from '@shared/components'
import {
  type SharedWithOption,
  sharedWithOption,
} from '@shared/consts/sharedWithOption'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { QuotationField } from './QuotationField'
import { ShareField } from './ShareField'

export const EditQuotationModal = (): JSX.Element => {
  const quotation = getState().quotation

  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(quotation?.name ?? '')
  const categorySignal = useSignal(quotation?.category ?? '')
  const descSignal = useSignal(quotation?.desc ?? '')
  const infoSignal = useSignal(quotation.info ?? '')

  const getOptionValue = (): SharedWithOption => {
    if (quotation?.sharedWith?.length === 0) return sharedWithOption.nobody
    if (quotation?.sharedWith?.includes('*')) return sharedWithOption.everybody
    return sharedWithOption.persons
  }

  const shareWithOptionSignal = useSignal<SharedWithOption>(getOptionValue())
  const sharedWithSignal = useSignal<string[]>(quotation?.sharedWith ?? [])

  const { onSubmit, isPending, isSuccess, isError } = useEditQuotation({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
  })

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
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
      <InfoField infoSignal={infoSignal} />
      <ShareField
        shareWithOptionSignal={shareWithOptionSignal}
        sharedWithSignal={sharedWithSignal}
      />
      <QuotationField blocks={quotation.blocks} />
    </FormModal>
  )
}
