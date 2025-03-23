import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type Quotation,
  quotationSlice,
  useGetQuotationsQuery,
  useSaveQuotationMutation,
  type ShareQuotationFormValues,
} from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { nanoid } from '@shared/lib/nanoid'
import {
  navSlice,
  showErrorNavIcon,
  showLoadingNavIcon,
  showSuccessNavIcon,
} from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/consts/route'
import { asyncDelay } from '@shared/utils/delay'
import { textSlice } from '@shared/lib/froala/textSlice'

type Props = {
  shareQuotationFormValues: ShareQuotationFormValues
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useShareQuotation = ({
  shareQuotationFormValues,
  slideOut,
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

  const { refetch: fetchQuotations } = useGetQuotationsQuery()

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navItemKey: navItemKey.share })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        toast.success('Saved', { position: 'bottom-center' })
      }

      if (data.message === 'updated') {
        toast.info('Updated', { position: 'bottom-center' })
      }

      if (data.message === 'copied and saved') {
        toast.success('Shared quotation was copied and saved', {
          position: 'bottom-center',
        })
      }

      void fetchQuotations()

      if (data.quotation) {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: data.quotation,
          }),
        )

        showSuccessNavIcon({ navItemKey: navItemKey.save })

        dispatch(navSlice.actions.removeUnderlineFromTopNav())

        dispatch(textSlice.actions.setNotEditable())

        setTimeout(() => {
          dispatch(textSlice.actions.setEditable())
        })

        const slideOutAndChangeUrl = async (): Promise<void> => {
          await asyncDelay(1000)
          await slideOut()
          const id = data.quotation?.id

          const isQuotationsPage = window.location.pathname.includes(
            route.quotations,
          )

          if (isQuotationsPage) {
            void navigate('..', { replace: true })
          } else {
            void navigate(`/${id}`, { replace: true })
          }
        }

        void slideOutAndChangeUrl()
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)

      showErrorNavIcon({ navItemKey: navItemKey.save })
      reset()
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      toast.warning('Not logged in')

      return
    }

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? nanoid(5) : existingId

    const quotation: Quotation = {
      ...getState().quotation,
      id,
      sharedWith: shareQuotationFormValues.sharedWithSignal.value,
    }

    saveQuotation({ quotation })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
