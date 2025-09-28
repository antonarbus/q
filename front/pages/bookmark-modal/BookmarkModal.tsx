import { FiEdit3 } from 'react-icons/fi'
import { useSaveBookmark } from '@features/bookmark/save-bookmark'
import { FormModal } from '@shared/component/FormModal'
import { BookmarkField } from './BookmarkField'
import {
  useLoadInitValuesIntoBookmarkModal,
  useLoadBookmarkModalOpenedWithDirectLink,
} from '@features/open-close/open-bookmark-modal'
import { useUnmount } from 'react-use'
import { quotationSlice } from '@entities/quotation'
import { dispatch } from '@shared/lib/redux'
import { router } from '@shared/lib/react-router-dom'
import { NameField } from '@shared/component/input-field/NameField'
import { CategoryField } from '@shared/component/input-field/CategoryField'
import { DescriptionField } from '@shared/component/input-field/DescriptionField'
import { InfoField } from '@shared/component/input-field/InfoField'
import { useGetBookmarkCategoryListQuery } from '@entities/bookmark'
import { useSlide } from '@shared/util/useSlide'
import type { JSX } from 'react'

export const BookmarkModal = (): JSX.Element => {
  const { ref: modalRef, slideOut } = useSlide()
  const { bookmarkFromValues } = useLoadInitValuesIntoBookmarkModal()
  useLoadBookmarkModalOpenedWithDirectLink({ bookmarkFromValues })

  const { onSubmit, isPending, isSuccess, isError } = useSaveBookmark({
    slideOut,
    bookmarkFromValues,
  })

  useUnmount(() => {
    dispatch(quotationSlice.actions.removeBlockFromPosThousandReducer())
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const categories = (
    getBookmarkCategoryListQuery.data?.categories ?? []
  ).filter((cat) => cat !== undefined)

  return (
    <FormModal
      buttonText='SAVE'
      headerIcon={<FiEdit3 />}
      headerText='Save bookmark'
      isButtonError={isError}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      modalRef={modalRef}
      onCloseClick={navigateUp}
      onSubmit={onSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='500px'
    >
      <NameField nameSignal={bookmarkFromValues.nameSignal} />
      <CategoryField
        categorySignal={bookmarkFromValues.categorySignal}
        options={categories}
      />
      <DescriptionField descSignal={bookmarkFromValues.descSignal} />
      <InfoField infoSignal={bookmarkFromValues.infoSignal} />
      <BookmarkField />
    </FormModal>
  )
}
