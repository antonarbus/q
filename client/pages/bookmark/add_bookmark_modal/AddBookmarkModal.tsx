import { useSignal } from '@preact/signals-react'
import { useRef } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useAddBookmark } from '@features/bookmark/add_bookmark'
import { getItemByIdFromStore } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const AddBookmarkModal = (): React.ReactNode => {
  const { id } = useParams()
  const item = getItemByIdFromStore({ id: id ?? 'missing id' })
  const modalRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')
  const { onSubmit, isPending, isSuccess, isError } = useAddBookmark({
    nameSignal,
    categorySignal,
    descSignal,
    modalRef,
  })
  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  return (
    <FormModal
      modalRef={modalRef}
      width='350px'
      paddingContent='50px 40px'
      headerText='Add to bookmarks'
      headerIcon={<MdOutlineStarOutline />}
      buttonText='ADD'
      isButtonDisabled={isDisabled}
      isButtonLoading={isPending}
      isButtonSuccess={isSuccess}
      isButtonError={isError}
      onSubmit={onSubmit}
      onCloseSlideModalOutAndNavigateUp={true}
    >
      <NameField nameSignal={nameSignal} />
      <CategoryField categorySignal={categorySignal} />
      <DescriptionField descSignal={descSignal} />
    </FormModal>
  )
}
