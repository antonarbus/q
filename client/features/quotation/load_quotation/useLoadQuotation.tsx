import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import {
  quotationSlice,
  useGetQuotationMutation,
  newQuotationTemplate,
  backgroundMessageSignal,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'

export function useLoadQuotation(): void {
  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  } = useGetQuotationMutation()
  const id = router.state.matches.at(0)?.params.id

  useEffect(
    function loadQuotationTemplate() {
      if (id === undefined || id === 'new') {
        loadingDotsOverlayTextSignal.value = 'Loading template...'

        dispatch(quotationSlice.actions.resetQuotationReducer())

        setTimeout(() => {
          dispatch(
            quotationSlice.actions.loadQuotationReducer({
              quotation: newQuotationTemplate,
            }),
          )
        }, 200)

        dispatch(
          navSlice.actions.enableNavItems({
            navItemIdKeys: [
              navItemId.save,
              navItemId.pdf,
              navItemId.share,
              navItemId.insert,
            ],
          }),
        )

        dispatch(navSlice.actions.removeUnderlineFromTopNav())
        dispatch(
          navSlice.actions.underlineNavItem({ navItemIdKey: navItemId.new }),
        )

        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
        }, 1000)
      }
    },
    [reRenderQuotationSignal.value],
  )

  useEffect(
    function loadQuotationWithId() {
      if (id !== undefined && id !== 'new') {
        dispatch(navSlice.actions.removeUnderlineFromTopNav())
        loadingDotsOverlayTextSignal.value = `Loading ${id}...`
        setTimeout(() => {
          loadingDotsOverlayTextSignal.value = null
        }, 1000)

        dispatch(quotationSlice.actions.resetQuotationReducer())
        dispatch(navSlice.actions.removeUnderlineFromTopNav())
        getQuotation({ id })
      }
    },
    [reRenderQuotationSignal.value],
  )

  useUpdateEffect(
    function showDots() {
      if (isPending) {
        loadingDotsOverlayTextSignal.value = `Loading ${id}...`
      }
    },
    [isPending],
  )

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

        dispatch(quotationSlice.actions.resetQuotationReducer())

        if (
          data.message === 'owner permission' ||
          data.message === 'viewer permission'
        ) {
          backgroundMessageSignal.value = ''
          dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

          dispatch(
            navSlice.actions.enableNavItems({
              navItemIdKeys: [
                navItemId.save,
                navItemId.pdf,
                navItemId.share,
                navItemId.insert,
              ],
            }),
          )

          setTimeout(() => {
            loadingDotsOverlayTextSignal.value = null
          }, 1000)
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
        }, 1000)
      }
    },
    [isError],
  )
}
