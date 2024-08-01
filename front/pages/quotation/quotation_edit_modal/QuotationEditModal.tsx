import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditQuotation } from '@features/quotation/edit_quotation'
import { FormModal } from '@shared/components'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { InfoField } from './InfoField'
import { NameField } from './NameField'
import { QuotationField } from './QuotationField'
import { ShareField } from './ShareField'
import {
  useLoadInitValuesIntoQuotationEditForm,
  useLoadQuotationEditModalOpenedWithDirectLink,
} from '@features/open_close/open_quotation_edit_modal'

// todo: remove edit modal and route

export const QuotationEditModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal('')
  const categorySignal = useSignal('')
  const descSignal = useSignal('')
  const infoSignal = useSignal('')
  const shareWithOptionSignal = useSignal<SharedWithOption>('nobody')
  const sharedWithSignal = useSignal<string[]>([])

  const { onSubmit, isPending, isSuccess, isError } = useEditQuotation({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
  })

  useLoadInitValuesIntoQuotationEditForm({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
    shareWithOptionSignal,
  })

  useLoadQuotationEditModalOpenedWithDirectLink({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
    sharedWithSignal,
    shareWithOptionSignal,
  })

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit quotation'
      buttonText='UPDATE'
      isButtonDisabled={nameSignal.value === '' || categorySignal.value === ''}
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
      <QuotationField />
    </FormModal>
  )
}
