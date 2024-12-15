import { router } from '@shared/lib/router'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import type { QuotationLocationState } from '@features/open_close/open_quotation_page'
import {
  quotationSlice,
  useGetQuotationMutation,
  newQuotationTemplate,
  backToQuotationRef,
} from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/toast'
import { appSlice } from '@shared/appSlice'

export function useLoadQuotation(): void {
  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()

  const quotationId = router.state.matches.at(0)?.params.quotationId
  const location = useLocation()

  const quotationKey = useSelector((state) => state.app.quotationKey)

  const quotationType = (location.state as QuotationLocationState)
    ?.quotationType

  useEffect(() => {
    const previousQuotation = backToQuotationRef.current

    dispatch(quotationSlice.actions.resetQuotationReducer())
    dispatch(navSlice.actions.removeUnderlineFromTopNav())

    dispatch(
      navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.back] }),
    )

    dispatch(
      navSlice.actions.enableNavItems({
        navItemIdKeys: [
          navItemKey.save,
          navItemKey.pdf,
          navItemKey.share,
          navItemKey.insert,
        ],
      }),
    )

    // load previous quotation
    if (quotationType === 'previous' && previousQuotation) {
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
            quotation: previousQuotation,
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
    if (quotationId === undefined || quotationId === 'new') {
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

      dispatch(
        navSlice.actions.underlineNavItem({ navItemIdKey: navItemKey.new }),
      )

      return
    }

    // load quotation from server
    if (quotationId !== 'new') {
      dispatch(
        appSlice.actions.showLoadingOverlay({
          showLoader: true,
          text: `Loading ${quotationId}...`,
        }),
      )

      getQuotation({ id: quotationId })
    }
  }, [quotationKey])

  useUpdateEffect(() => {
    if (isSuccess) {
      const quotation = data.quotation

      if (quotation === undefined) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (quotation.blocks === undefined) {
        notify({ msg: 'Quotation corrupted', type: 'warn', theme: 'light' })

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
            navItemIdKeys: [
              navItemKey.save,
              navItemKey.pdf,
              navItemKey.share,
              navItemKey.insert,
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
        notify({ msg: 'Internal error', type: 'error', theme: 'light' })

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
