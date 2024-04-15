import { router } from '@lib_instances/Router'
import { dispatch, getState } from '@lib_instances/store'
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { quotationSlice, useGetQuotationMutation } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'
import { newQuotation } from './newQuotation'

export function useLoadQuotation(): void {
  const { mutate: getQuotation, data, isSuccess, isPending, isError, error } = useGetQuotationMutation()
  const id = router.state.matches.at(0)?.params.id

  useEffect(() => {
    if (id === undefined || id === 'new') {
      loadingDotsOverlayTextSignal.value = 'Loading template...'

      dispatch(quotationSlice.actions.resetQuotationReducer())

      setTimeout(() => {
        dispatch(quotationSlice.actions.loadQuotationReducer({
          quotation: newQuotation,
        }))
      }, 200)

      dispatch(navSlice.actions.enableNavItems({
        navItemIdKeys: [navItemId.save, navItemId.pdf, navItemId.share, navItemId.insert],
      }))

      dispatch(navSlice.actions.removeUnderlineFromTopNav())
      dispatch(navSlice.actions.underlineNavItem({ navItemIdKey: navItemId.new }))

      setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 1000)
    }
  }, [reRenderQuotationSignal.value])

  useEffect(() => {
    if (id !== undefined && id !== 'new') {
      const didSaveNewQuotation = getState().quotation.id === id

      if (didSaveNewQuotation) return

      dispatch(quotationSlice.actions.resetQuotationReducer())
      dispatch(navSlice.actions.removeUnderlineFromTopNav())
      getQuotation({ id })
    }
  }, [reRenderQuotationSignal.value])

  useUpdateEffect(() => {
    if (isPending) {
      loadingDotsOverlayTextSignal.value = 'Loading...'
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      const { items, quotation } = data

      if (items === undefined || quotation === undefined) return

      dispatch(quotationSlice.actions.resetQuotationReducer())

      if (data.message === 'found' && data.quotation) {
        dispatch(quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }))

        dispatch(navSlice.actions.enableNavItems({
          navItemIdKeys: [navItemId.save, navItemId.pdf, navItemId.share, navItemId.insert],
        }))

        setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 1000)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'not logged in') {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      void router.navigate('./login')
    } else if (error.response?.data.message === 'not found') {
      notify({ msg: 'Not found', type: 'warn', theme: 'light' })
    } else {
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }

    setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 1000)
  }, [isError])
}
