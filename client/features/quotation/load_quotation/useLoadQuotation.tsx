import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { defaultItems, itemsSlice } from '@entities/items'
import { quotationSignal, useGetQuotationMutation } from '@entities/quotation'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'

export function useLoadQuotation(): void {
  const { mutate: getQuotation, data, isSuccess, isPending, isError, error } = useGetQuotationMutation()
  const id = router.state.matches.at(0)?.params.id

  useEffect(() => {
    if (id === undefined || id === 'new') {
      loadingDotsOverlayTextSignal.value = 'Loading template...'
      quotationSignal.value = { email: '', id: '' }
      dispatch(itemsSlice.actions.loadItemsReducer({ items: [] }))

      setTimeout(() => {
        dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
        quotationSignal.value = { id: 'new', email: '' }
      }, 200)

      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'add' }))
      setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)
    }
  }, [reRenderQuotationSignal.value])

  useEffect(() => {
    if (id !== undefined && id !== 'new') {
      const didSavedNewQuotation = quotationSignal.peek().id === id
      if (didSavedNewQuotation) return
      quotationSignal.value = { email: '', id: '' }
      dispatch(itemsSlice.actions.loadItemsReducer({ items: [] }))

      getQuotation({ id })
    }
  }, [reRenderQuotationSignal.value])

  useUpdateEffect(() => {
    if (!isPending) return
    loadingDotsOverlayTextSignal.value = 'Loading...'
  }, [isPending])

  useUpdateEffect(() => {
    if (!isSuccess) return

    const { items, quotation } = data

    if (items === undefined || quotation === undefined) return

    dispatch(itemsSlice.actions.loadItemsReducer({ items }))

    if (data.message === 'found') {
      quotationSignal.value = quotation
      dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
      dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
      setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 1000)
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
