import { dispatch, getState } from '@lib_instances/store'
import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkCategoriesQuery, useGetBookmarksQuery, useSaveBookmarkMutation } from '@entities/bookmark'
import { itemKey, quotationSlice, saveItemHeightByIndex } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useEditBookmark = ({
  modalRef,
  nameSignal,
  categorySignal,
  descSignal,
}: Props): Res => {
  const navigate = useNavigate()

  const { mutate: saveItem, data, isSuccess, isPending, isError, error, reset } = useSaveBookmarkMutation()
  const { refetch: updateItemCategories } = useGetBookmarkCategoriesQuery()
  const { refetch: updateItems } = useGetBookmarksQuery()

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

  return { onSubmit, isPending, isSuccess, isError }
}
