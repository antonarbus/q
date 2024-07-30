import { dispatch, getState } from '@lib_instances/store'
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
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { quotationSlice } from '@entities/quotation'

export const EditBookmarkModal = (): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal('')
  const categorySignal = useSignal('')
  const descSignal = useSignal('')
  const infoSignal = useSignal('')

  useEffectOnce(() => {
    const firstBlock = getState().quotation.blocks.at(0)

    if (firstBlock) {
      nameSignal.value = firstBlock.name ?? ''
      categorySignal.value = firstBlock.category ?? ''
      descSignal.value = firstBlock.desc ?? ''
      infoSignal.value = firstBlock.info ?? ''
    }
  })

  const { id } = useParams()

  const {
    mutate: loadBookmark,
    isSuccess: isBookmarkSuccess,
    data,
  } = useGetBookmarkMutation()

  useEffectOnce(() => {
    if (id) {
      loadBookmark({ id })
    }
  })

  useUpdateEffect(() => {
    if (isBookmarkSuccess && data.item) {
      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: {
            type: 'quotation',
            id: 'edit-bookmark',
            name: 'edit-bookmark',
            category: 'edit-bookmark',
            desc: 'edit-bookmark',
            info: 'edit-bookmark',
            email: 'edit-bookmark',
            sharedWith: [],
            preview: 'edit-bookmark',
            blocks: [data.item],
          },
        }),
      )

      const firstBlock = getState().quotation.blocks.at(0)

      if (firstBlock) {
        nameSignal.value = firstBlock.name ?? ''
        categorySignal.value = firstBlock.category ?? ''
        descSignal.value = firstBlock.desc ?? ''
        infoSignal.value = firstBlock.info ?? ''
      }
    }
  }, [isBookmarkSuccess])

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

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
