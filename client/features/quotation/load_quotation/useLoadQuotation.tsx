import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
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
import { notify } from '@shared/ui/top_msg'

export function useLoadQuotation(): void {
  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()
  const id = router.state.matches.at(0)?.params.id

  useEffect(
    function loadQuotation() {
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
      if (previousQuotation && id === previousQuotationRef.current?.id) {
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
      if (id !== undefined && id !== 'new') {
        loadingDotsOverlayTextSignal.value = `Loading ${id}...`
        getQuotation({ id })
      }
    },
    [reRenderQuotationSignal.value],
  )

  // useUpdateEffect(
  //   function showDots() {
  //     if (isPending) {
  //       loadingDotsOverlayTextSignal.value = `Loading ${id}...`
  //     }
  //   },
  //   [isPending],
  // )

  useUpdateEffect(
    function handleSuccess() {
      if (isSuccess) {
        const quotation = data.quotation

        if (quotation === undefined) return

        if (quotation.items === undefined) {
          notify({ msg: 'Quotation corrupted', type: 'warn', theme: 'light' })
          setTimeout(() => {
            loadingDotsOverlayTextSignal.value = null
          }, 1000)
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
    },
    [isSuccess],
  )

  useUpdateEffect(
    function handleErrors() {
      if (isError) {
        if (error.response?.data.message === 'no permission to view') {
          backgroundMessageSignal.value = `No permission to view quotation ${id}`
        } else if (
          error.response?.data.message === 'not found in bucket' ||
          error.response?.data.message === 'not found in db'
        ) {
          backgroundMessageSignal.value = `Quotation ${id} is not found`
        } else if (error.response?.data.message === 'not shared') {
          backgroundMessageSignal.value = `Quotation ${id} is private`
        } else {
          notify({ msg: 'Internal error', type: 'error', theme: 'light' })
          backgroundMessageSignal.value = 'Internal error'
        }

        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
        }, 750)
      }
    },
    [isError],
  )
}
