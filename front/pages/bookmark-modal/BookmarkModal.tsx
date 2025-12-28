import { useGetBookmarkCategoryListQuery } from '@entities/bookmark/api/useGetBookmarkCategoryListQuery'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { useSaveBookmark } from '@features/bookmark/save-bookmark'
import {
  useLoadBookmarkModalOpenedWithDirectLink,
  useBookmarkFormValues,
} from '@features/open-close/open-bookmark-modal'
import { FormModal } from '@shared/component/FormModal'
import { CategoryField } from '@shared/component/input-field/CategoryField'
import { DescriptionField } from '@shared/component/input-field/DescriptionField'
import { InfoField } from '@shared/component/input-field/InfoField'
import { NameField } from '@shared/component/input-field/NameField'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch } from '@shared/lib/redux'
import { useAnimatedElement } from '@shared/util/useAnimatedElement'
import type { JSX } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useUnmount } from 'react-use'
import { BookmarkField } from './BookmarkField'

export const BookmarkModal = (): JSX.Element => {
  const animatedElement = useAnimatedElement()
  const bookmarkFormValues = useBookmarkFormValues()
  useLoadBookmarkModalOpenedWithDirectLink({ bookmarkFormValues })

  const saveBookmark = useSaveBookmark({
    slideOut: animatedElement.slideOut,
    bookmarkFormValues,
  })

  useUnmount(() => {
    dispatch(quotationSlice.actions.removeBlockFromPosThousandReducer())
  })

  const navigateUp = (): void => {
    void router.navigate('..')
  }

  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const distinctCategoryList =
    getBookmarkCategoryListQuery.data?.distinctCategoryList ?? []

  return (
    <FormModal
      buttonText='SAVE'
      headerIcon={<FiEdit3 />}
      headerText='Save bookmark'
      isButtonError={saveBookmark.isError}
      isButtonLoading={saveBookmark.isPending}
      isButtonSuccess={saveBookmark.isSuccess}
      modalRef={animatedElement.ref}
      onCloseClick={navigateUp}
      onSubmit={saveBookmark.handleSubmit}
      onUnmount={navigateUp}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      width='500px'
    >
      <NameField nameSignal={bookmarkFormValues.nameSignal} />
      <CategoryField
        categorySignal={bookmarkFormValues.categorySignal}
        options={distinctCategoryList}
      />
      <DescriptionField descSignal={bookmarkFormValues.descSignal} />
      <InfoField infoSignal={bookmarkFormValues.infoSignal} />
      <BookmarkField />
    </FormModal>
  )
}
