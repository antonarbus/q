import { dispatch } from '@lib_instances/store'
import { customAlphabet } from 'nanoid'
import { useEffect, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { defaultItems, itemsSlice, saveItemsLocally } from '@entities/items'
import { type Item } from '@entities/items/types'
import { getDefaultOrLocalItems } from '@entities/items/utils/getDefaultOrLocalItems'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { route } from '@shared/consts/route'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { spinnerTextSignal } from '@shared/spinner'
import { useGetQuotationQuery } from '../api/useGetQuotationQuery'
import { getDefaultQuotation } from '../model/getDefaultQuotation'
import { quotationSignal } from '../signals/quotationSignal'
import { type Quotation } from '../types'
import { getDefaultOrLocalQuotation } from '../utils/getDefaultOrLocalQuotation'
import { saveQuotationLocally } from '../utils/saveQuotationLocally'

export const useLoadQuotation = (): ReactNode => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isSuccess, isFetching, isError } = useGetQuotationQuery()

  // todo: if we have an id, then always load from the server

  useLoadTemplateOrLocalQuotationForRootRoute()

  useEffect(() => {
    if (id === undefined) return
    if (!isFetching) return
    spinnerTextSignal.value = 'Checking...'
    dispatch(itemsSlice.actions.loadItemsReducer({ items: [] }))
    quotationSignal.value = { id: '' }
  }, [isFetching])

  useEffect(() => {
    if (id === undefined) return
    if (!isSuccess) return

    if (data.message === 'not found') {
      setTimeout(() => { spinnerTextSignal.value = 'Not found' }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
        navigate(-1)
      }, 3000)

      return
    }

    if (data.message === 'not logged in') {
      setTimeout(() => { spinnerTextSignal.value = 'Not logged in' }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
        navigate(-1)
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
      setTimeout(() => { spinnerTextSignal.value = 'Quotation found' }, 1000)
      setTimeout(() => { spinnerTextSignal.value = null }, 3000)
      return
    }

    if (
      data.message === 'found' && (
        data.items === undefined ||
        data.items.length === 0 ||
        data.quotation === undefined
      )
    ) {
      setTimeout(() => { spinnerTextSignal.value = 'Quotation is empty' }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
        navigate(-1)
      }, 3000)
      return
    }

    if (data.message === 'json does not exist') {
      setTimeout(() => { spinnerTextSignal.value = 'Does not exist' }, 1000)
      setTimeout(() => {
        spinnerTextSignal.value = null
        navigate(-1)
      }, 3000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (id === undefined) return
    if (!isError) return

    setTimeout(() => { spinnerTextSignal.value = 'Error' }, 1000)
    setTimeout(() => {
      spinnerTextSignal.value = null
      navigate(-1)
    }, 3000)
  }, [isError])

  return null
}

function useLoadTemplateOrLocalQuotationForRootRoute(): void {
  useEffectOnce(() => {
    if (window.location.pathname !== route.root) return

    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    if (itemsFromLocalStorage === null) {
      loadTemplate()
      return
    }

    const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
    if (items === undefined) {
      loadTemplate()
      return
    }

    if (items.length === 0) {
      loadTemplate()
      return
    }

    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)
    if (quotationFromLocalStorage === null) {
      loadTemplate()
      return
    }

    const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
    if (quotation === undefined) {
      loadTemplate()
      return
    }

    spinnerTextSignal.value = 'Loading existing quotation from browser...'
    setTimeout(() => { spinnerTextSignal.value = null }, 2000)
    quotationSignal.value = quotation
    dispatch(itemsSlice.actions.loadItemsReducer({ items }))
  })
}

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')
const quotationId = nanoid(5)

function loadTemplate(): void {
  spinnerTextSignal.value = 'Loading default template...'
  setTimeout(() => { spinnerTextSignal.value = null }, 3000)
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  quotationSignal.value = { id: quotationId }
  localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
  localStorage.setItem(localStorageKey.quotation, JSON.stringify(quotationSignal.value))
}
