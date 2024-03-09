import { dispatch } from '@lib_instances/store'
import { useEffect, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { type Item } from '@entities/items/types'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { spinnerTextSignal } from '@shared/spinner'
import { useGetQuotationQuery } from '../api/useGetQuotationQuery'
import { quotationSignal } from '../signals/quotationSignal'
import { type Quotation } from '../types'
import { saveQuotationLocally } from '../utils/saveQuotationLocally'

export const useLoadQuotation = (): ReactNode => {
  const { id } = useParams()
  const { data, isSuccess, isLoading, isError } = useGetQuotationQuery()

  // todo: if we have an id, then always load from the server
  // todo: if it is root url we need to load items here, instead of add it as a default values in items and quotation slices

  // if we locally keep the same quotation load it from the browser
  useEffectOnce(() => {
    if (id !== undefined) return
    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    if (itemsFromLocalStorage === null) return
    const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
    if (items === undefined) return
    if (items.length === 0) return

    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)
    if (quotationFromLocalStorage === null) return
    const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
    if (quotation === undefined) return
    if (quotationFromLocalStorage === null) return

    // todo: if we did not come here we should load default quotation

    // todo: if we came here we have a valid quotation in browser and may load it

    spinnerTextSignal.value = 'Loading from the browser'

    dispatch(itemsSlice.actions.loadItemsReducer({ items }))
    quotationSignal.value = quotation

    setTimeout(() => {
      spinnerTextSignal.value = null
    }, 3000)
  })

  useEffect(() => {
    if (id === undefined) return
    if (!isLoading) return
    spinnerTextSignal.value = 'Loading from the server'
  }, [isLoading])

  useEffect(() => {
    if (id === undefined) return
    if (!isSuccess) return

    if (data.message === 'not found') {
      setTimeout(() => {
        spinnerTextSignal.value = 'Not found'
      }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
      }, 3000)

      return
    }

    if (data.message === 'not logged in') {
      setTimeout(() => {
        spinnerTextSignal.value = 'Not logged in'
      }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
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
      saveQuotationLocally()
      saveItemsLocally()
      setTimeout(() => {
        spinnerTextSignal.value = 'Quotation found'
      }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
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
        spinnerTextSignal.value = 'Quotation is empty'
      }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
      }, 3000)
      return
    }

    if (
      data.message === 'json does not exist') {
      setTimeout(() => {
        spinnerTextSignal.value = 'Does not exist'
      }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
      }, 3000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (id === undefined) return
    if (!isError) return

    setTimeout(() => {
      spinnerTextSignal.value = 'Error'
    }, 1000)
    setTimeout(() => {
      spinnerTextSignal.value = null
    }, 3000)
  }, [isError])

  return null
}
