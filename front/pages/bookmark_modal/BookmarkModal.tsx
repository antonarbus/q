import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useSaveBookmark } from '@features/bookmark/save_bookmark'
import { FormModal } from '@shared/components/FormModal'
import { BookmarkField } from './BookmarkField'
import {
  useLoadInitValuesIntoBookmarkModal,
  useLoadBookmarkModalOpenedWithDirectLink,
} from '@features/open_close/open_bookmark_modal'
import { useUnmount } from 'react-use'
import { quotationSlice } from '@entities/quotation'
import { dispatch } from '@shared/lib/redux'
import { instance } from '@shared/instance'
import { NameField } from '@shared/components/input_fields/NameField'
import { CategoryField } from '@shared/components/input_fields/CategoryField'
import { DescriptionField } from '@shared/components/input_fields/DescriptionField'
import { InfoField } from '@shared/components/input_fields/InfoField'
import { useGetBookmarkCategoriesQuery } from '@entities/bookmark'

export const BookmarkModal = (): React.JSX.Element => {
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
    void instance.router.navigate('..')
  }

  const { data } = useGetBookmarkCategoriesQuery()
  const categories = (data?.categories ?? []).filter((cat) => cat !== undefined)

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
      <NameField
        nameSignal={bookmarkFromValues.nameSignal}
        required
      />
      <CategoryField
        categorySignal={bookmarkFromValues.categorySignal}
        options={categories}
        required
      />
      <DescriptionField descSignal={bookmarkFromValues.descSignal} />
      <InfoField infoSignal={bookmarkFromValues.infoSignal} />
      <BookmarkField />
    </FormModal>
  )
}
