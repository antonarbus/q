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
import { InfoField } from './InfoField'

export const EditBookmarkModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstBlock = getState().quotation.blocks.at(0)
  const nameSignal = useSignal(firstBlock?.name ?? '')
  const categorySignal = useSignal(firstBlock?.category ?? '')
  const descSignal = useSignal(firstBlock?.desc ?? '')
  const infoSignal = useSignal(firstBlock?.info ?? '')

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  const { onSubmit, isPending, isSuccess, isError } = useEditBookmark({
    modalRef,
    nameSignal,
    categorySignal,
    descSignal,
    infoSignal,
  })

  // todo: row bookmark not opening

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
      <InfoField infoSignal={infoSignal} />
      <BookmarkField />
    </FormModal>
  )
}
