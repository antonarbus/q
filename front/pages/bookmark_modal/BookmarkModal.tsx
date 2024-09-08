import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useSaveBookmark } from '@features/bookmark/save_bookmark'
import { FormModal } from '@shared/components/FormModal'
import { BookmarkField } from './BookmarkField'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'
import { InfoField } from './InfoField'
import {
  useLoadInitValuesIntoBookmarkModal,
  useLoadBookmarkModalOpenedWithDirectLink,
} from '@features/open_close/open_bookmark_modal'
import { useUnmount } from 'react-use'
import { quotationSlice } from '@entities/quotation'
import { dispatch } from '@lib_instances/store'
import { router } from '@lib_instances/router'

export const BookmarkModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { bookmarkFromValues } = useLoadInitValuesIntoBookmarkModal()
  useLoadBookmarkModalOpenedWithDirectLink({ bookmarkFromValues })
  const { onSubmit, isPending, isSuccess, isError } = useSaveBookmark({
    modalRef,
    bookmarkFromValues,
  })

  useUnmount(() => {
    dispatch(quotationSlice.actions.removeBlockFromPosThousandReducer())
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  const isButtonDisabled =
    bookmarkFromValues.nameSignal.value === '' ||
    bookmarkFromValues.categorySignal.value === ''

  return (
    <FormModal
      modalRef={modalRef}
      width='500px'
      headerIcon={<FiEdit3 />}
      headerText='Save bookmark'
      buttonText='SAVE'
      isButtonDisabled={isButtonDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={navigateUp}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
    >
      <NameField nameSignal={bookmarkFromValues.nameSignal} />
      <CategoryField categorySignal={bookmarkFromValues.categorySignal} />
      <DescriptionField descSignal={bookmarkFromValues.descSignal} />
      <InfoField infoSignal={bookmarkFromValues.infoSignal} />
      <BookmarkField />
    </FormModal>
  )
}
