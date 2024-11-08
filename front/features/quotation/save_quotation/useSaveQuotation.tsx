import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  isFroalaSignal,
  type Quotation,
  quotationSlice,
  useGetQuotationCategoriesQuery,
  useGetQuotationsQuery,
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
import { notify } from '@shared/toast'
import { slideElement } from '@shared/utils/slideElement'
import type { QuotationFormValues } from '@entities/quotation/types'
import { route } from '@shared/consts/route'

type Props = {
  modalRef: React.RefObject<HTMLDivElement>
  quotationFormValues: QuotationFormValues
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveQuotation = ({
  modalRef,
  quotationFormValues,
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

  const { refetch: fetchQuotations } = useGetQuotationsQuery()

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemKey.save })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({
          msg: 'Saved',
          type: 'success',
          theme: 'dark',
          position: 'bottom-center',
        })
      }

      if (data.message === 'updated') {
        notify({
          msg: 'Updated',
          type: 'info',
          theme: 'dark',
          position: 'bottom-center',
        })
      }

      if (data.message === 'copied and saved') {
        notify({
          msg: 'Shared quotation was copied and saved',
          type: 'success',
          theme: 'dark',
          position: 'bottom-center',
        })
      }

      void updateCategories()
      void fetchQuotations()

      if (data.quotation) {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: data.quotation,
          }),
        )

        showSuccessNavIcon({ navMenuItemIdKey: navItemKey.save })

        dispatch(navSlice.actions.removeUnderlineFromTopNav())

        isFroalaSignal.value = false

        setTimeout(() => {
          isFroalaSignal.value = true
        })

        setTimeout(() => {
          slideElement({
            element: modalRef.current,
            onSlideElementComplete: () => {
              const id = data.quotation?.id

              const isQuotationsPage = window.location.pathname.includes(
                route.quotations,
              )

              if (isQuotationsPage) {
                navigate('..', { replace: true })
              } else {
                navigate(`/${id}`, { replace: true })
              }
            },
          })
        }, 1000)
      }
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
      name: quotationFormValues.nameSignal.value,
      category: quotationFormValues.categorySignal.value,
      desc: quotationFormValues.descSignal.value,
      info: quotationFormValues.infoSignal.value,
      sharedWith: quotationFormValues.sharedWithSignal.value,
      blocks: getState().quotation.blocks,
    }

    saveQuotation({ quotation })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
