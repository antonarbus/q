import { getState } from '@lib_instances/store'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  useGetBookmarkCategoriesQuery,
  useGetBookmarksQuery,
  useSaveBookmarkMutation,
} from '@entities/bookmark'
import { saveBlockHeightByIndex } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
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
  infoSignal,
}: Props): Res => {
  const navigate = useNavigate()

  const {
    mutate: saveItem,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useSaveBookmarkMutation()

  const { refetch: updateItemCategories } = useGetBookmarkCategoriesQuery()
  const { refetch: updateBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({
          msg: 'Saved',
          type: 'success',
          theme: 'dark',
          position: 'bottom-center',
        })
      } else if (data.message === 'updated') {
        notify({
          msg: 'Updated',
          type: 'success',
          theme: 'dark',
          position: 'bottom-center',
        })
      }

      void updateItemCategories()
      void updateBookmarks()

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
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'dark',
        position: 'bottom-center',
      })
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

    const block = getState().quotation.blocks.at(1000)

    if (!block) {
      notify({ msg: 'No item loaded', type: 'warn', theme: 'light' })
      return
    }

    saveBlockHeightByIndex({ blockIndex: 0 })
    const paperElement = document.querySelector(`.${cls.paper}`)
    if (!(paperElement instanceof Element)) return

    const html = paperElement.innerHTML
    const cleanedHtml = cleanHtml(html)

    const itemWithUpdatedPreview = structuredClone(block)
    itemWithUpdatedPreview.preview = cleanedHtml

    const itemWithUpdatedValues = {
      ...itemWithUpdatedPreview,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
      info: infoSignal.value,
    }

    saveItem({ item: itemWithUpdatedValues })
  }, [])

  return { onSubmit, isPending, isSuccess, isError }
}
