import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { createLoadingMenuIconMachine } from '@front/shared/nav/state-machine/createLoadingMenuIconMachine'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
import { useSaveQuotationMutation } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { Quotation } from '@back/entity/quotation/schema'
import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
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
  handleSubmit: (event: React.SubmitEvent) => Promise<void>
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
      // May save new quotation by sharing the link, strange, but maybe nice
      if (saveQuotationMutation.data.status === 'SAVED') {
        toast.success(`Saved under id ${quotation.id}`)
      }

      // Usual case
      if (saveQuotationMutation.data.status === 'UPDATED') {
        toast.info('Updated')
      }

      if (saveQuotationMutation.data.status === 'COPIED') {
        toast.success('Shared quotation was copied, saved and shared', {
          duration: 5000,
        })
      }

      void getQuotationListQuery.refetch()

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

  const handleSubmit = async (event: React.SubmitEvent): Promise<void> => {
    event.preventDefault()

    if (reduxHolder.getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const accessLevel = props.accessFormValuesSignal.value.level

    if (accessLevel !== 'nobody') {
      const unpaidPaymentBlocks = reduxHolder
        .getState()
        .quotation.blocks.filter(
          (block) => block.type === 'payment' && block.payment.stripePaymentLinkUrl === null,
        )

      if (unpaidPaymentBlocks.length > 0) {
        const confirmed = await confirmWithDialog({
          title: 'Payment link not generated',
          description:
            'Payment link is not configured and will be removed. Do you want to proceed?',
          confirmButtonText: 'Share anyway',
          rejectButtonText: 'Cancel',
        })

        if (confirmed === false) {
          return
        }

        for (const block of unpaidPaymentBlocks) {
          reduxHolder.dispatch(quotationSlice.actions.deleteBlock({ id: block.id }))
        }
      }
    }

    const existingId = reduxHolder.getState().quotation.id
    const id = existingId === 'new' ? generateId() : existingId

    if (accessLevel === 'everyone') {
      props.accessFormValuesSignal.value.userList = []
    }

    if (accessLevel === 'nobody') {
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
