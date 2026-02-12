import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { createLoadingMenuIconMachine } from '@entity/nav/state-machine/createLoadingMenuIconMachine'
import { useGetQuotationCategoryListQuery } from '@entity/quotation/api/useGetQuotationCategoryListQuery'
import { useGetQuotationListQuery } from '@entity/quotation/api/useGetQuotationListQuery'
import { useSaveQuotationMutation } from '@entity/quotation/api/useSaveQuotationMutation'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { Quotation } from '@back/entity/quotation/schema'
import type { SaveQuotationFormValues } from '@entity/quotation/form/types'
import { route } from '@shared/lib/react-router-dom/route'
import { dispatch, getState } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import type { SubmitEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { createActor } from 'xstate'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: SubmitEvent) => void
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
        toast.success(
          `Saved under id ${saveQuotationMutation.data.quotation.id}`,
        )
      }

      if (saveQuotationMutation.data.status === 'UPDATED') {
        toast.info('Updated')
      }

      // this should not be a use case in main page, but we still may open /id/save route directly
      // this may be a use case in quotations page
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

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: {
            ...getState().quotation,
            ...saveQuotationMutation.data.quotation,
          },
        }),
      )

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

  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault()

    if (getState().user.email === null) {
      toast.warning('Not logged in')

      return
    }

    const quotation: Quotation = {
      ...getState().quotation,
      name: props.saveQuotationFormValues.nameSignal.value,
      category: props.saveQuotationFormValues.categorySignal.value,
      desc: props.saveQuotationFormValues.descSignal.value,
      info: props.saveQuotationFormValues.infoSignal.value,
      blocks: getState().quotation.blocks,
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
