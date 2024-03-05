import { dispatch } from '@lib_instances/store'
import { useEffect, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { itemsSlice } from '@entities/items'
import { spinnerSlice } from '@entities/spinner/spinnerSlice'
import { useGetQuotation } from '../api/useGetQuotation'

export const FetchQuotation = (): ReactNode => {
  const { id } = useParams()
  const { data, isSuccess, isLoading, isError, error } = useGetQuotation()

  useEffect(() => {
    if (isLoading) {
      dispatch(itemsSlice.actions.removeItemsReducer())
      dispatch(spinnerSlice.actions.startSpinner({ text: `Loading quotation ${id}` }))
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      dispatch(itemsSlice.actions.loadItemsReducer({
        items: data?.items ?? [],
      }))
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 1000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      console.log(error)
      setTimeout(() => {
        dispatch(spinnerSlice.actions.stopSpinner())
      }, 1000)
    }
  }, [isError])

  return null
}
