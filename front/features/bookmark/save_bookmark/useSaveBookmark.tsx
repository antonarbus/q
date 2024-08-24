import { dispatch, getState } from '@lib_instances/store'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import type { BookmarkFromValues } from '@entities/bookmark'
import {
  useGetBookmarkCategoriesQuery,
  useGetBookmarksQuery,
  useSaveBookmarkMutation,
} from '@entities/bookmark'
import { bookmarkPosAtBlocks, quotationSlice } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { getPaperElementHtmlAtModal } from '@shared/utils'
import { cls } from '@shared/consts/cls'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
  bookmarkFromValues: BookmarkFromValues
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveBookmark = ({
  modalRef,
  bookmarkFromValues,
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
          type: 'info',
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

    const paperElement = document.querySelector(
      `.${cls.formModal} .${cls.paper}`,
    )

    if (!paperElement) return

    dispatch(
      quotationSlice.actions.updateBlockHeightReducer({
        blockIndex: bookmarkPosAtBlocks,
        height: paperElement.clientHeight,
      }),
    )

    const block = getState().quotation.blocks.at(bookmarkPosAtBlocks)

    if (!block) {
      notify({ msg: 'No item loaded', type: 'warn', theme: 'light' })
      return
    }

    const html = getPaperElementHtmlAtModal()

    const itemWithUpdatedPreview = structuredClone(block)

    itemWithUpdatedPreview.preview = html

    const itemWithUpdatedValues = {
      ...itemWithUpdatedPreview,
      name: bookmarkFromValues.nameSignal.value,
      category: bookmarkFromValues.categorySignal.value,
      desc: bookmarkFromValues.descSignal.value,
      info: bookmarkFromValues.infoSignal.value,
    }

    saveItem({ item: itemWithUpdatedValues })
  }, [])

  return { onSubmit, isPending, isSuccess, isError }
}
