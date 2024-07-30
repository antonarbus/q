import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useEditBookmark } from '@features/bookmark/edit_bookmark'
import { FormModal } from '@shared/components'
import { BookmarkField } from './BookmarkField'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'
import { InfoField } from './InfoField'
import {
  useLoadInitValuesIntoBookmarkEditModal,
  useLoadBookmarkEditModalOpenedWithDirectLink,
} from '@features/open_close/open_bookmark_edit_modal'

export const BookmarkEditModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal('')
  const categorySignal = useSignal('')
  const descSignal = useSignal('')
  const infoSignal = useSignal('')

  useLoadInitValuesIntoBookmarkEditModal({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
  })

  useLoadBookmarkEditModalOpenedWithDirectLink({
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
  })

  const { onSubmit, isPending, isSuccess, isError } = useEditBookmark({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
  })

  return (
    <FormModal
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Edit bookmark'
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
      <BookmarkField />
    </FormModal>
  )
}
