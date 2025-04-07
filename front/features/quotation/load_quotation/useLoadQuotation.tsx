import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect } from 'react'
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
import { useParams } from 'react-router-dom'

export function useLoadQuotation(): void {
  const { quotationId } = useParams()

  const quotationKey = useSelector((state) => state.app.quotationKey)

  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()

  // quotation loading
  useEffect(() => {
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
    if (backToQuotationRef.current !== null) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Going back...',
        }),
      )

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: backToQuotationRef.current,
        }),
      )

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 1250)

      backToQuotationRef.current = null

      return
    }

    // load new quotation template
    if (quotationId === 'new' || quotationId === undefined) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: 'Loading template...',
        }),
      )

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: newQuotationTemplate,
        }),
      )

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 1250)

      dispatch(navSlice.actions.underlineNavItem({ navItemId: navItemId.new }))

      return
    }

    // load quotation from server
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (quotationId !== 'new' && quotationId !== undefined) {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: `Loading ${quotationId}...`,
        }),
      )

      getQuotation({ id: quotationId })
    }
  }, [quotationKey, quotationId])

  // above we triggered quotation loading, now we handle the response
  useUpdateEffect(() => {
    if (isSuccess && quotationId !== 'new' && quotationId !== undefined) {
      const quotation = data.quotation

      // check if quotation json is corrupted on the server side
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (quotation.blocks === undefined) {
        toast.warning('Quotation corrupted')

        setTimeout(() => {
          dispatch(appSlice.actions.hideLoadingOverlay())
        }, 1250)

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
        }, 1250)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      const quotation = error.response?.data.quotation

      if (quotation !== undefined) {
        dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
      }

      if (error.response?.data.message === 'no permission to view') {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `No permission to view quotation ${quotationId}`,
          }),
        )
      } else if (
        error.response?.data.message === 'not found in bucket' ||
        error.response?.data.message === 'not found in db'
      ) {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${quotationId} is not found`,
          }),
        )
      } else if (error.response?.data.message === 'not shared') {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${quotationId} is private`,
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
      }, 1250)
    }
  }, [isError])
}
