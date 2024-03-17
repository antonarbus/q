import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { itemsSlice } from '@entities/items'
import { quotationSignal, useGetQuotationQuery } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'

export function useLoadServerQuotation(): void {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isSuccess, isFetching, isError } = useGetQuotationQuery()

  useEffect(() => {
    if (id === undefined) return
    if (location.pathname.includes(route.login)) return

    if (isFetching) {
      loadingDotsOverlayTextSignal.value = 'Checking...'
      dispatch(itemsSlice.actions.loadItemsReducer({ items: [] }))
      quotationSignal.value = { id: '', email: '' }
      return
    }

    if (isSuccess) {
      if (data.message === 'not found') {
        setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Not found' }, 1000)
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
          // navigate(-1)
        }, 3000)

        return
      }

      if (data.message === 'not logged in') {
        setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Not logged in' }, 1000)
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null

          if (!location.pathname.includes(route.login)) {
            void router.navigate(`./${route.login}`)
          }
        }, 3000)

        return
      }

      if (data.message === 'json does not exist') {
        setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Does not exist' }, 1000)
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
          // navigate(-1)
        }, 3000)

        return
      }

      if (
        data.message === 'found' && (
          data.items === undefined ||
          data.items.length === 0 ||
          data.quotation === undefined
        )
      ) {
        setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Quotation is empty' }, 1000)
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
          // navigate(-1)
        }, 3000)

        return
      }

      if (
        data.message === 'found' &&
        data.items !== undefined &&
        data.items.length !== 0 &&
        data.quotation !== undefined
      ) {
        dispatch(itemsSlice.actions.loadItemsReducer({ items: data.items }))
        quotationSignal.value = data.quotation
        dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
        dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
        dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
        setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Loading...' }, 1000)
        setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 3000)
      }
    }
  }, [isFetching, isSuccess])

  useEffect(() => {
    if (id === undefined) return
    if (!isError) return

    setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Error' }, 1000)
    setTimeout(() => {
      loadingDotsOverlayTextSignal.value = null
      navigate(-1)
    }, 3000)
  }, [isError])
}
