import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { createLoadingMenuIconMachine } from '@entity/nav/state-machine/createLoadingMenuIconMachine'
import { useGetQuotationListQuery } from '@entity/quotation/api/useGetQuotationListQuery'
import { useSaveQuotationMutation } from '@entity/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { Quotation } from '@back/entity/quotation/schema'
import type { AccessFormValuesSignal } from '@entity/quotation/form/types'
import { generateId } from '@root/shared/lib/nanoid'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { createActor } from 'xstate'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.share,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useShareQuotation = (props: Props): Res => {
  const navigate = useNavigate()
  const isQuotationsPage = useLocation().pathname.includes(route.quotationList)
  const saveQuotationMutation = useSaveQuotationMutation()
  const getQuotationListQuery = useGetQuotationListQuery()

  useUpdateEffect(() => {
    if (saveQuotationMutation.isPending === true) {
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [saveQuotationMutation.isPending])

  useUpdateEffect(() => {
    const quotation = saveQuotationMutation.data?.quotation

    if (quotation === undefined) {
      return
    }

    if (saveQuotationMutation.isSuccess === true) {
      // may save new quotation by sharing the link, strange, but maybe nice
      if (saveQuotationMutation.data.status === 'SAVED') {
        toast.success(`Saved under id ${quotation.id}`)
      }

      // usual case
      if (saveQuotationMutation.data.status === 'UPDATED') {
        toast.info('Updated')
      }

      if (saveQuotationMutation.data.status === 'COPIED') {
        toast.success('Shared quotation was copied, saved and shared', {
          duration: 5000,
        })
      }

      void getQuotationListQuery.refetch()

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: {
            ...getState().quotation,
            ...saveQuotationMutation.data.quotation,
          },
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        const navigateTo =
          isQuotationsPage === true
            ? '..'
            : `/${saveQuotationMutation.data.quotation.id}`

        void navigate(navigateTo, { replace: true })
      }

      void slideOutAndChangeUrl()
    }
  }, [saveQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (saveQuotationMutation.isError === true) {
      toast.error(saveQuotationMutation.error.response?.data.message)
      loadingIconActor.send({ type: 'show error icon' })
      saveQuotationMutation.reset()
    }
  }, [saveQuotationMutation.isError])

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const existingId = getState().quotation.id
    const id = existingId === 'new' ? generateId() : existingId

    if (props.accessFormValuesSignal.value.level === 'everyone') {
      props.accessFormValuesSignal.value.userList = []
    }

    if (props.accessFormValuesSignal.value.level === 'nobody') {
      props.accessFormValuesSignal.value.userList = []
    }

    const quotation: Quotation = {
      ...getState().quotation,
      id,
      access: props.accessFormValuesSignal.value,
    }

    saveQuotationMutation.mutate({ quotation })
    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
  }

  return {
    handleSubmit,
    isPending: saveQuotationMutation.isPending,
    isSuccess: saveQuotationMutation.isSuccess,
    isError: saveQuotationMutation.isError,
  }
}
