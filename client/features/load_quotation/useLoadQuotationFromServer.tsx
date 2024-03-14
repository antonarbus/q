import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { quotationSignal, saveQuotationLocally, useGetQuotationQuery } from '@entities/quotation'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'

export function useLoadQuotationFromServer(): void {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isSuccess, isFetching, isError } = useGetQuotationQuery()

  useEffect(() => {
    if (id === undefined) return
    if (!isFetching) return
    loadingDotsOverlayTextSignal.value = 'Checking...'
    dispatch(itemsSlice.actions.loadItemsReducer({ items: [] }))
    quotationSignal.value = { id: '', email: '' }
  }, [isFetching])

  useEffect(() => {
    if (id === undefined) return
    if (!isSuccess) return

    if (data.message === 'not found') {
      setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Not found' }, 1000)
      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate(-1)
      }, 3000)

      return
    }

    if (data.message === 'not logged in') {
      setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Not logged in' }, 1000)
      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate(-1)
      }, 3000)

      return
    }

    if (data.message === 'json does not exist') {
      setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Does not exist' }, 1000)
      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
        navigate(-1)
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
      setTimeout(() => { loadingDotsOverlayTextSignal.value = 'Loading...' }, 1000)
      setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 3000)
    }
  }, [isSuccess])

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
