import { dispatch, getState } from '@lib_instances/store'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type Quotation,
  quotationSlice,
  useGetQuotationCategoriesQuery,
  useSaveQuotationMutation,
} from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { nanoid } from '@shared/lib/nanoid'
import {
  navSlice,
  showErrorNavIcon,
  showLoadingNavIcon,
  showSuccessNavIcon,
} from '@shared/nav'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
  sharedWithSignal: Signal<string[]>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveQuotation = ({
  modalRef,
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
  sharedWithSignal,
}: Props): Res => {
  const navigate = useNavigate()

  const {
    mutate: saveQuotation,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useSaveQuotationMutation()

  const { refetch: updateCategories } = useGetQuotationCategoriesQuery()

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemKey.save })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      notify({
        msg: data.message === 'saved' ? 'Saved' : 'Updated',
        type: data.message === 'saved' ? 'success' : 'info',
        theme: 'dark',
        position: 'bottom-center',
      })

      void updateCategories()

      if (data.quotation) {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: data.quotation,
          }),
        )
      }

      showSuccessNavIcon({ navMenuItemIdKey: navItemKey.save })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate(`/${data.quotation?.id ?? 'no id set'}`)
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
      showErrorNavIcon({ navMenuItemIdKey: navItemKey.save })
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

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? nanoid(5) : existingId

    const quotation: Quotation = {
      ...getState().quotation,
      id,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
      info: infoSignal.value,
      sharedWith: sharedWithSignal.value,
      blocks: getState().quotation.blocks,
    }

    saveQuotation({ quotation })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
