import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type Quotation,
  quotationSlice,
  useGetQuotationListQuery,
  useSaveQuotationMutation,
  type AccessFormValuesSignal,
} from '@entities/quotation'
import { navItemId } from '@shared/const/navItemId'
import { generateId } from '@shared/lib/nanoid'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/const/route'
import { asyncDelay } from '@shared/util/delay'
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
  const isQuotationsPage = useLocation().pathname.includes(route.quotationList)

  const {
    mutate: saveQuotation,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useSaveQuotationMutation()

  const { refetch: fetchQuotations } = useGetQuotationListQuery()

  useUpdateEffect(() => {
    if (isPending === true) {
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [isPending])

  useUpdateEffect(() => {
    const quotation = data?.quotation

    if (quotation === undefined) {
      return
    }

    if (isSuccess === true) {
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
        const navigateTo = isQuotationsPage === true ? '..' : `/${id}`
        void navigate(navigateTo, { replace: true })
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)
      loadingIconActor.send({ type: 'show error icon' })
      reset()
    }
  }, [isError])

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()

    if (getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? generateId() : existingId

    if (accessFormValuesSignal.value.level === 'everyone') {
      accessFormValuesSignal.value.userList = []
    }

    if (accessFormValuesSignal.value.level === 'nobody') {
      accessFormValuesSignal.value.userList = []
    }

    const quotation: Quotation = {
      ...getState().quotation,
      id,
      access: accessFormValuesSignal.value,
    }

    saveQuotation({ quotation })
    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
  }

  return { onSubmit, isPending, isSuccess, isError }
}
