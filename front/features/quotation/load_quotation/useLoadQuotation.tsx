import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  quotationSlice,
  useGetQuotationMutation,
  newQuotationTemplate,
  backToQuotationRef,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { appSlice } from '@shared/appSlice'

export function useLoadQuotation(): void {
  const { quotationId } = useParams()
  const quotationSource = useSelector((state) => state.app.quotationSource)
  const quotationKey = useSelector((state) => state.app.quotationKey)

  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()

  useEffect(() => {
    const previousQuotationData = backToQuotationRef.current

    dispatch(quotationSlice.actions.resetQuotationReducer())
    dispatch(navSlice.actions.removeUnderlineFromTopNav())
    dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }))

    dispatch(
      navSlice.actions.enableNavItems({
        navItemIds: [
          navItemId.save,
          navItemId.pdf,
          navItemId.excel,
          navItemId.share,
          navItemId.insert,
        ],
      }),
    )

    // load previous quotation when user clicks on back button
    if (quotationSource === 'previous' && previousQuotationData) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Going back...',
        }),
      )

      // avoid resetting and loading quotation batching, otherwise there is unwanted items animation
      setTimeout(() => {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: previousQuotationData,
          }),
        )
      }, 100)

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 750)

      backToQuotationRef.current = null

      return
    }

    // load new quotation template
    if (quotationSource === 'template') {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Loading template...',
        }),
      )

      // avoid resetting and loading quotation batching, otherwise there is unwanted items animation
      setTimeout(() => {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: newQuotationTemplate,
          }),
        )
      }, 100)

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 750)

      dispatch(navSlice.actions.underlineNavItem({ navItemId: navItemId.new }))

      return
    }

    // load quotation from server
    if (quotationSource === 'server' && quotationId !== undefined) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: `Loading ${quotationId}...`,
        }),
      )

      getQuotation({ id: quotationId })
    }
  }, [quotationKey, quotationSource])

  // above we triggered quotation loading, now we handle the response
  useUpdateEffect(() => {
    const quotation = data?.quotation

    if (isSuccess && quotation !== undefined) {
      // check if quotation json is corrupted on the server side
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (quotation.blocks === undefined) {
        toast.warning('Quotation corrupted')

        setTimeout(() => {
          dispatch(appSlice.actions.hideLoadingOverlay())
        }, 750)

        return
      }

      if (
        data.message === 'super-admin permission' ||
        data.message === 'owner permission' ||
        data.message === 'viewer permission'
      ) {
        dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))
        dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

        dispatch(
          navSlice.actions.enableNavItems({
            navItemIds: [
              navItemId.save,
              navItemId.pdf,
              navItemId.excel,
              navItemId.share,
              navItemId.insert,
            ],
          }),
        )

        setTimeout(() => {
          dispatch(appSlice.actions.hideLoadingOverlay())
        }, 750)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'no permission to view') {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `No permission to view quotation ${String(quotationId)}`,
          }),
        )
      } else if (
        error.response?.data.message === 'not found in bucket' ||
        error.response?.data.message === 'not found in db'
      ) {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${String(quotationId)} is not found`,
          }),
        )
      } else if (error.response?.data.message === 'not shared') {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${String(quotationId)} is private`,
          }),
        )
      } else {
        toast.error('Internal error')

        dispatch(
          appSlice.actions.setBackgroundMessage({ message: 'Internal error' }),
        )
      }

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 750)
    }
  }, [isError])
}
