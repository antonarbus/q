import { getState } from '@lib_instances/store'
import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  useGetBookmarkCategoriesQuery,
  useGetBookmarksQuery,
  useSaveBookmarkMutation,
} from '@entities/bookmark'
import { getItemFromStore } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  modalRef: React.RefObject<HTMLDivElement>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useAddBookmark = ({
  nameSignal,
  categorySignal,
  descSignal,
  modalRef,
}: Props): Res => {
  const navigate = useNavigate()
  const { id } = useParams()
  const item = getItemFromStore({ id: id ?? 'missing id' })

  const {
    mutate: saveItem,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useSaveBookmarkMutation()

  const { refetch: updateCategories } = useGetBookmarkCategoriesQuery()
  const { refetch: updateBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({
          msg: 'Added',
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

      void updateCategories()
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

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    if (!item) {
      notify({ msg: 'No item with such id', type: 'warn', theme: 'light' })
      return
    }

    const itemWithUpdatedValues = {
      ...item,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
    }

    saveItem({ item: itemWithUpdatedValues })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
