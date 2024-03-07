import { dispatch } from '@lib_instances/store'
import { useEffect, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { type Item } from '@entities/items/types'
import { spinnerSlice } from '@entities/spinner/spinnerSlice'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { useGetQuotation } from '../api/useGetQuotation'
import { quotationSignal } from '../signals/quotationSignal'
import { type Quotation } from '../types'
import { saveQuotationLocally } from '../utils/saveQuotationLocally'

export const useFetchQuotation = (): ReactNode => {
  const { id } = useParams()
  const { data, isSuccess, isLoading, isError } = useGetQuotation()

  // load quotation from the browser
  useEffectOnce(() => {
    if (id !== undefined) return
    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)
    if (itemsFromLocalStorage === null) return
    if (quotationFromLocalStorage === null) return
    const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
    const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
    if (items === undefined) return
    if (items.length === 0) return
    if (quotation === undefined) return
    if (quotationFromLocalStorage === null) return

    dispatch(spinnerSlice.actions.startSpinner({ text: 'Loading quotation from the browser' }))

    dispatch(itemsSlice.actions.loadItemsReducer({ items }))
    quotationSignal.value = quotation

    setTimeout(() => {
      dispatch(spinnerSlice.actions.stopSpinner())
    }, 3000)
  })

  useEffect(() => {
    if (id === undefined) return
    if (isLoading) {
      // dispatch(itemsSlice.actions.removeItemsReducer())
      dispatch(spinnerSlice.actions.startSpinner({ text: `Loading quotation ${id} from the server` }))
    }
  }, [isLoading])

  useEffect(() => {
    if (id === undefined) return
    if (!isSuccess) return

    if (data.message === 'not found') {
      setTimeout(() => {
        dispatch(spinnerSlice.actions.startSpinner({ text: 'Not found' }))
      }, 1000)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 3000)

      return
    }

    if (data.message === 'not logged in') {
      setTimeout(() => {
        dispatch(spinnerSlice.actions.startSpinner({ text: 'Not logged in' }))
      }, 1000)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 3000)

      return
    }

    if (
      data.message === 'found' &&
      data.items !== undefined &&
      data.items.length !== 0 &&
      data.quotation !== undefined
    ) {
      dispatch(itemsSlice.actions.loadItemsReducer({
        items: data.items,
      }))
      quotationSignal.value = data.quotation
      saveQuotationLocally()
      saveItemsLocally()
      setTimeout(() => {
        dispatch(spinnerSlice.actions.startSpinner({ text: `Quotation ${id} found` }))
      }, 1000)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 3000)
      return
    }

    if (
      data.message === 'found' && (
        data.items === undefined ||
        data.items.length === 0 ||
        data.quotation === undefined
      )) {
      setTimeout(() => {
        dispatch(spinnerSlice.actions.startSpinner({ text: 'Quotation is empty' }))
      }, 1000)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 3000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (id === undefined) return
    if (!isError) return

    setTimeout(() => {
      dispatch(spinnerSlice.actions.startSpinner({ text: 'Error' }))
    }, 1000)
    setTimeout(() => {
      dispatch(spinnerSlice.actions.stopSpinner())
    }, 3000)
  }, [isError])

  return null
}
