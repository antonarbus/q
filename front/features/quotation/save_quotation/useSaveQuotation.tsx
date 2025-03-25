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
import { navItemKey } from '@shared/consts/navItemKey'
import { nanoid } from '@shared/lib/nanoid'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { route } from '@shared/consts/route'
import { asyncDelay } from '@shared/utils/delay'
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
  navItemKey: navItemKey.save,
  navItemNameWhileLoading: 'Saving',
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const useSaveQuotation = ({
  saveQuotationFormValues,
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

  const { refetch: updateCategories } = useGetQuotationCategoriesQuery()
  const { refetch: fetchQuotations } = useGetQuotationsQuery()

  useUpdateEffect(() => {
    if (isPending) {
      loadingIconActor.send({ type: 'show loading icon' })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess && data.quotation !== undefined) {
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
        )
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
    const id = existingId === 'new' ? nanoid(5) : existingId

    const quotation: Quotation = {
      ...getState().quotation,
      id,
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
