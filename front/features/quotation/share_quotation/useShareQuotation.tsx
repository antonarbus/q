import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/consts/route'
import { asyncDelay } from '@shared/utils/delay'
import { createActor } from 'xstate'

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

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemKey.share,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useShareQuotation = ({
  shareQuotationFormValues,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()
  const isQuotationsPage = useLocation().pathname.includes(route.quotations)

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
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [isPending])

  useUpdateEffect(() => {
    const quotation = data?.quotation

    if (isSuccess && quotation !== undefined) {
      // may save new quotation by sharing the link, strange, but maybe nice
      if (data.message === 'saved') {
        toast.success(`Saved under id ${quotation.id}`, {
          position: 'bottom-center',
        })
      }

      // usual case
      if (data.message === 'updated') {
        toast.info('Updated', { position: 'bottom-center' })
      }

      if (data.message === 'copied and saved') {
        toast.success('Shared quotation was copied, saved and shared', {
          position: 'bottom-center',
        })
      }

      void fetchQuotations()
      dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        const id = data.quotation?.id
        const navigateTo = isQuotationsPage ? '..' : `/${id}`
        void navigate(navigateTo, { replace: true })
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)
      loadingIconActor.send({ type: 'show error icon' })
      reset()
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!getState().user.email) {
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
