import { getState } from '@lib_instances/store'
import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  useGetQuotationCategoriesQuery,
  useGetQuotationsQuery,
  useSaveQuotationMutation,
} from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
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

export const useEditQuotation = ({
  modalRef,
  nameSignal,
  categorySignal,
  descSignal,
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
  const { refetch: updateQuotationCategories } =
    useGetQuotationCategoriesQuery()
  const { refetch: fetchQuotations } = useGetQuotationsQuery()

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

      void updateQuotationCategories()
      void fetchQuotations()

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            navigate('..', { replace: true, state: nanoid() })
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

    const quotation = getState().quotation

    if (!quotation) return

    const quotationWithUpdatedValues = {
      ...quotation,
      name: nameSignal.value,
      category: categorySignal.value,
      desc: descSignal.value,
    }

    saveQuotation({ quotation: quotationWithUpdatedValues })
  }, [])

  return { onSubmit, isPending, isSuccess, isError }
}
