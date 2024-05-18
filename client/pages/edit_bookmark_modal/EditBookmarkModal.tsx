import { dispatch, getState } from '@lib_instances/store'
import { useSignal } from '@preact/signals-react'
import { useCallback, useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkCategoriesQuery, useGetBookmarksQuery, useSaveBookmarkMutation } from '@entities/bookmark'
import { itemKey, quotationSlice, saveItemHeightByIndex } from '@entities/quotation'
import { FormModal } from '@shared/components'
import { cls } from '@shared/consts/cls'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { slideElement } from '@shared/utils/slideElement'
import { BookmarkField } from './BookmarkField'
import { CategoryField } from './CategoryField'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'

export const EditBookmarkModal = (): JSX.Element => {
  const { id } = useParams()
  console.log('🚀 ~ id:', id)
  const navigate = useNavigate()
  const item = getState().quotation.items.at(0)
  const modalRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')

  const { mutate: saveItem, data, isSuccess, isPending, isError, error, reset } = useSaveBookmarkMutation()
  const { refetch: updateItemCategories } = useGetBookmarkCategoriesQuery()
  const { refetch: updateItems } = useGetBookmarksQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateItemCategories()
      void updateItems()

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate('..')
          },
        })
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'dark', position: 'bottom-center' })
      reset()
    }
  }, [isError])

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    const item = getState().quotation.items.at(0)

    if (!item) {
      notify({ msg: 'No item loaded', type: 'warn', theme: 'light' })
      return
    }

    if (item.type === itemKey.row) {
      const boqRowElement = document.querySelector(`.${cls.boqRow}`)
      if (!boqRowElement) return

      dispatch(quotationSlice.actions.updateBoqRowHeightAndWidthReducer({
        itemIndex: 0,
        rowIndex: 0,
        height: boqRowElement.clientHeight,
        width: boqRowElement.clientWidth,
      }))

      const item = getState().quotation.items.at(0)
      if (!item) return

      const html = boqRowElement.outerHTML
      const cleanedHtml = cleanHtml(html)

      const itemWithUpdatedPreview = structuredClone(item)
      itemWithUpdatedPreview.preview = cleanedHtml

      const itemWithUpdatedValues = {
        ...itemWithUpdatedPreview,
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
      }

      saveItem({ item: itemWithUpdatedValues })
    } else {
      saveItemHeightByIndex({ itemIndex: 0 })
      const paperElement = document.querySelector(`.${cls.paper}`)
      if (!(paperElement instanceof Element)) return

      const html = paperElement.innerHTML
      const cleanedHtml = cleanHtml(html)

      const item = getState().quotation.items.at(0)
      if (!item) return

      const itemWithUpdatedPreview = structuredClone(item)
      itemWithUpdatedPreview.preview = cleanedHtml

      const itemWithUpdatedValues = {
        ...itemWithUpdatedPreview,
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
      }

      saveItem({ item: itemWithUpdatedValues })
    }
  }, [])

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
      <NameField nameSignal={nameSignal}/>
      <CategoryField categorySignal={categorySignal}/>
      <DescriptionField descSignal={descSignal} />
      <BookmarkField />
    </FormModal>
  )
}
