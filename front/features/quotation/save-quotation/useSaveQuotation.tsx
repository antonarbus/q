import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { createLoadingMenuIconMachine } from '@front/shared/nav/state-machine/createLoadingMenuIconMachine'
import { useGetQuotationCategoryListQuery } from '@front/entities/quotation/api/useGetQuotationCategoryListQuery'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
import { useSaveQuotationMutation } from '@front/entities/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { draftQuotationStorage } from '@front/entities/quotation/storage/draftQuotationStorage'
import type { Quotation } from '@back/entity/quotation/schema'
import type { SaveQuotationFormValues } from '@front/entities/quotation/form/types'
import { route } from '@front/shared/lib/react-router-dom/route'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { createActor } from 'xstate'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (event: React.SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.save,
  navItemNameWhileLoading: 'Saving...',
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useSaveQuotation = (props: Props): Res => {
  const navigate = useNavigate()
  const isQuotationsPage = useLocation().pathname.includes(route.quotationList)
  const saveQuotationMutation = useSaveQuotationMutation()
  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()
  const getQuotationListQuery = useGetQuotationListQuery()

  useUpdateEffect(() => {
    if (saveQuotationMutation.isPending === true) {
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [saveQuotationMutation.isPending])

  useUpdateEffect(() => {
    if (saveQuotationMutation.data?.quotation === undefined) {
      return
    }

    if (saveQuotationMutation.isSuccess === true) {
      if (saveQuotationMutation.data.status === 'SAVED') {
        toast.success(`Saved under id ${saveQuotationMutation.data.quotation.id}`)
      }

      if (saveQuotationMutation.data.status === 'UPDATED') {
        toast.info('Updated')
      }

      // This should not be a use case in main page, but we still may open /id/save route directly
      // This may be a use case in quotations page
      if (saveQuotationMutation.data.status === 'COPIED') {
        toast.success(
          `Shared quotation was copied and saved under id ${saveQuotationMutation.data.quotation.id}`,
          {
            duration: 5000,
          },
        )

        void navigate(`/${saveQuotationMutation.data.quotation.id}`)
      }

      void getQuotationCategoryListQuery.refetch()
      void getQuotationListQuery.refetch()

      draftQuotationStorage.clear()
      loadingIconActor.send({ type: 'show success icon' })
      reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: {
            ...reduxHolder.getState().quotation,
            ...saveQuotationMutation.data.quotation,
          },
        }),
      )

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()

        // The 1s delay above is long enough for the auto-save debounce to fire and
        // re-write the draft with the saved ID. Clear it again before navigating.
        draftQuotationStorage.clear()

        const navigateTo =
          isQuotationsPage === true ? '..' : `/${saveQuotationMutation.data.quotation.id}`

        void navigate(navigateTo, { replace: true })
      }

      void slideOutAndChangeUrl()
    }
  }, [saveQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (saveQuotationMutation.isError === true) {
      if (saveQuotationMutation.error.response?.data.errorCode === 'SUBSCRIPTION_REQUIRED') {
        reduxHolder.dispatch(navSlice.actions.showNavItems({ navItemIds: [navItemId.back] }))
        void navigate(`/${route.subscription}`)
      } else {
        toast.error(saveQuotationMutation.error.response?.data.message)
      }

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

    const quotation: Quotation = {
      ...reduxHolder.getState().quotation,
      name: props.saveQuotationFormValues.nameSignal.value,
      category: props.saveQuotationFormValues.categorySignal.value,
      desc: props.saveQuotationFormValues.descSignal.value,
      info: props.saveQuotationFormValues.infoSignal.value,
      blocks: reduxHolder.getState().quotation.blocks,
    }

    saveQuotationMutation.mutate({ quotation })
  }

  return {
    handleSubmit,
    isPending: saveQuotationMutation.isPending,
    isSuccess: saveQuotationMutation.isSuccess,
    isError: saveQuotationMutation.isError,
  }
}
