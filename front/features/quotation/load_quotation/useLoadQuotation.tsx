import { router } from '@lib_instances/router'
import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import type { QuotationLocationState } from '@features/open_close/open_quotation_page'
import {
  quotationSlice,
  useGetQuotationMutation,
  newQuotationTemplate,
  backgroundMessageSignal,
  previousQuotationRef,
} from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/toast'

export function useLoadQuotation(): void {
  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()
  const id = router.state.matches.at(0)?.params.id
  const location = useLocation()
  const quotationType = (location.state as QuotationLocationState)
    ?.quotationType

  useEffect(() => {
    const previousQuotation = previousQuotationRef.current

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
      loadingDotsOverlayTextSignal.value = 'Going back...'

      // avoid resetting and loading quotation batching, otherwise there is unwanted items animation
      setTimeout(() => {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: previousQuotation,
          }),
        )
      }, 100)

      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
      }, 750)

      previousQuotationRef.current = null
      return
    }

    // load new quotation template
    if (id === undefined || id === 'new') {
      loadingDotsOverlayTextSignal.value = 'Loading template...'

      // avoid resetting and loading quotation batching, otherwise there is unwanted items animation
      setTimeout(() => {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: newQuotationTemplate,
          }),
        )
      }, 100)

      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
      }, 750)

      dispatch(
        navSlice.actions.underlineNavItem({ navItemIdKey: navItemKey.new }),
      )

      return
    }

    // load quotation from server
    if (id !== 'new') {
      loadingDotsOverlayTextSignal.value = `Loading ${id}...`
      getQuotation({ id })
    }
  }, [reRenderQuotationSignal.value])

  useUpdateEffect(() => {
    if (isSuccess) {
      const quotation = data.quotation

      if (quotation === undefined) return

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (quotation.blocks === undefined) {
        notify({ msg: 'Quotation corrupted', type: 'warn', theme: 'light' })
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
        }, 750)
        return
      }

      if (
        data.message === 'owner permission' ||
        data.message === 'viewer permission'
      ) {
        backgroundMessageSignal.value = ''
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
          loadingDotsOverlayTextSignal.value = null
        }, 750)
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'no permission to view') {
        backgroundMessageSignal.value = `No permission to view quotation ${String(id)}`
      } else if (
        error.response?.data.message === 'not found in bucket' ||
        error.response?.data.message === 'not found in db'
      ) {
        backgroundMessageSignal.value = `Quotation ${String(id)} is not found`
      } else if (error.response?.data.message === 'not shared') {
        backgroundMessageSignal.value = `Quotation ${String(id)} is private`
      } else {
        notify({ msg: 'Internal error', type: 'error', theme: 'light' })
        backgroundMessageSignal.value = 'Internal error'
      }

      setTimeout(() => {
        loadingDotsOverlayTextSignal.value = null
      }, 750)
    }
  }, [isError])
}
