import { dispatch } from '@lib_instances/store'
import { useEffect, type ReactNode, useState } from 'react'
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

export const FetchQuotation = (): ReactNode => {
  const { id } = useParams()
  const [enabled, setEnabled] = useState(false)
  console.log('🚀 ~ enabled:', enabled)
  const { data, isSuccess, isLoading, isError } = useGetQuotation({ enabled })

  useEffectOnce(() => {
    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)

    if (itemsFromLocalStorage !== null && quotationFromLocalStorage !== null) {
      const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
      if (items !== undefined) {
        dispatch(itemsSlice.actions.loadItemsReducer({ items }))
      }

      const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
      if (quotation !== undefined) {
        quotationSignal.value = quotation
      }

      if (quotation?.id !== id) {
        setEnabled(true)
      }
    }
  })

  useEffect(() => {
    if (isLoading) {
      dispatch(itemsSlice.actions.removeItemsReducer())
      dispatch(spinnerSlice.actions.startSpinner({ text: `Loading quotation ${id}` }))
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      if (data.message === 'found') {
        if (data.items) {
          dispatch(itemsSlice.actions.loadItemsReducer({
            items: data.items,
          }))
          saveItemsLocally()
        }

        if (data.quotation) {
          quotationSignal.value = data.quotation
          saveQuotationLocally()
        }

        setTimeout(() => {
          dispatch(spinnerSlice.actions.stopSpinner())
        }, 1000)

        return
      }

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
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(spinnerSlice.actions.startSpinner({ text: 'Error' }))
      }, 1000)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 3000)
    }
  }, [isError])

  return null
}
