import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type Quotation,
  quotationSlice,
  useGetQuotationCategoriesQuery,
  useGetQuotationsQuery,
  useSaveQuotationMutation,
  type SaveQuotationFormValues,
} from '@entities/quotation'
import { navItemId } from '@shared/const/navItemId'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/const/route'
import { asyncDelay } from '@shared/util/delay'
import { createActor } from 'xstate'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemId: navItemId.save,
  navItemNameWhileLoading: 'Saving...',
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useSaveQuotation = ({
  saveQuotationFormValues,
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

  const { refetch: updateCategories } = useGetQuotationCategoriesQuery()
  const { refetch: fetchQuotations } = useGetQuotationsQuery()

  useUpdateEffect(() => {
    if (isPending === true) {
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (data?.quotation === undefined) {
      return
    }

    if (isSuccess === true) {
      if (data.message === 'saved') {
        toast.success(`Saved under id ${data.quotation.id}`)
      }

      // ths should not be a use case in main page, but we still may open /id/save route directly
      // this may be a use case in quotations page
      if (data.message === 'updated') {
        toast.info('Updated')
      }

      // this should not be a use case in main page, but we still may open /id/save route directly
      // this may be a use case in quotations page
      if (data.message === 'copied and saved') {
        toast.success(
          `Shared quotation was copied and saved under id ${data.quotation.id}`,
          {
            duration: 5000,
          },
        )

        void navigate(`/${data.quotation.id}`)
      }

      void updateCategories()
      void fetchQuotations()

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }),
      )

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

    const quotation: Quotation = {
      ...getState().quotation,
      name: saveQuotationFormValues.nameSignal.value,
      category: saveQuotationFormValues.categorySignal.value,
      desc: saveQuotationFormValues.descSignal.value,
      info: saveQuotationFormValues.infoSignal.value,
      blocks: getState().quotation.blocks,
    }

    saveQuotation({ quotation })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
