import { getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditBookmark } from '@features/bookmark/edit_bookmark'
import { FormModal } from '@shared/components'
import { BookmarkField } from './BookmarkField'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const EditBookmarkModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const item = getState().quotation.items.at(0)
  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')
  const { onSubmit, isPending, isSuccess, isError } = useEditBookmark({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
  })
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit bookmark'
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
      <BookmarkField />
    </FormModal>
  )
}
