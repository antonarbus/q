import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { spinnerTextSignal } from '@shared/spinner'
import { useGetQuotationQuery } from '../api/useGetQuotationQuery'
import { quotationSignal } from '../signals/quotationSignal'
import { saveQuotationLocally } from '../utils/saveQuotationLocally'

export function useLoadQuotationFromServer(): void {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isSuccess, isFetching, isError } = useGetQuotationQuery()

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
      setTimeout(() => { spinnerTextSignal.value = 'Loading...' }, 1000)
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
}
