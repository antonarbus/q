import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type Quotation,
  quotationSlice,
  useGetQuotationsQuery,
  useSaveQuotationMutation,
  type AccessFormValuesSignal,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { generateId } from '@shared/lib/nanoid'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/consts/route'
import { asyncDelay } from '@shared/utils/delay'
import { createActor } from 'xstate'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.share,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useShareQuotation = ({
  accessFormValuesSignal,
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
        toast.success(`Saved under id ${quotation.id}`)
      }

      // usual case
      if (data.message === 'updated') {
        toast.info('Updated')
      }

      if (data.message === 'copied and saved') {
        toast.success('Shared quotation was copied, saved and shared', {
          duration: 5000,
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

    if (getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? generateId() : existingId

    const quotation: Quotation = {
      ...getState().quotation,
      id,
      access: accessFormValuesSignal.value,
    }

    saveQuotation({ quotation })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
