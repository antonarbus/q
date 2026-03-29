import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { createLoadingMenuIconMachine } from '@front/entities/nav/state-machine/createLoadingMenuIconMachine'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
import { useSaveQuotationMutation } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { Quotation } from '@back/entity/quotation/schema'
import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { generateId } from '@front/shared/lib/nanoid'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { createActor } from 'xstate'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: React.SubmitEvent) => void
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

      getQuotationListQuery.refetch()

      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: {
            ...reduxHolder.getState().quotation,
            ...saveQuotationMutation.data.quotation,
          },
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        const navigateTo =
          isQuotationsPage === true ? '..' : `/${saveQuotationMutation.data.quotation.id}`

        navigate(navigateTo, { replace: true })
      }

      slideOutAndChangeUrl()
    }
  }, [saveQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (saveQuotationMutation.isError === true) {
      toast.error(saveQuotationMutation.error.response?.data.message)
      loadingIconActor.send({ type: 'show error icon' })
      saveQuotationMutation.reset()
    }
  }, [saveQuotationMutation.isError])

  const handleSubmit = (event: React.SubmitEvent): void => {
    event.preventDefault()

    if (reduxHolder.getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const existingId = reduxHolder.getState().quotation.id
    const id = existingId === 'new' ? generateId() : existingId

    if (props.accessFormValuesSignal.value.level === 'everyone') {
      props.accessFormValuesSignal.value.userList = []
    }

    if (props.accessFormValuesSignal.value.level === 'nobody') {
      props.accessFormValuesSignal.value.userList = []
    }

    const quotation: Quotation = {
      ...reduxHolder.getState().quotation,
      id,
      access: props.accessFormValuesSignal.value,
    }

    saveQuotationMutation.mutate({ quotation })
    reduxHolder.dispatch(quotationSlice.actions.loadQuotation({ quotation }))
  }

  return {
    handleSubmit,
    isPending: saveQuotationMutation.isPending,
    isSuccess: saveQuotationMutation.isSuccess,
    isError: saveQuotationMutation.isError,
  }
}
