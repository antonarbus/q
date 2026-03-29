import { useGetBookmarkCategoryListQuery } from '@front/entities/bookmark/api/useGetBookmarkCategoryListQuery'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import {
  useLoadBookmarkModalOpenedWithDirectLink,
  useBookmarkFormValues,
} from '@front/features/open-close/open-bookmark-modal'
import { FormModal } from '@front/shared/component/FormModal'
import { CategoryField } from '@front/shared/component/input-field/CategoryField'
import { DescriptionField } from '@front/shared/component/input-field/DescriptionField'
import { InfoField } from '@front/shared/component/input-field/InfoField'
import { NameField } from '@front/shared/component/input-field/NameField'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { reduxHolder } from '@front/shared/lib/redux'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { FiEdit3 } from 'react-icons/fi'
import { useUnmount } from 'react-use'
import { BookmarkField } from './BookmarkField'
import { useSaveBookmark } from '@front/features/bookmark/save-bookmark/useSaveBookmark'

export const BookmarkModal = (): React.JSX.Element => {
  const animatedElement = useAnimatedElement()
  const bookmarkFormValues = useBookmarkFormValues()
  useLoadBookmarkModalOpenedWithDirectLink({ bookmarkFormValues })

  const saveBookmark = useSaveBookmark({
    slideOut: animatedElement.slideOut,
    bookmarkFormValues,
  })

  useUnmount(() => {
    reduxHolder.dispatch(quotationSlice.actions.removeBlockFromPosThousand())
  })

  const navigateUp = (): void => {
    void routerHolder.router.navigate('..')
  }

  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const distinctCategoryList = getBookmarkCategoryListQuery.data?.distinctCategoryList ?? []

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
