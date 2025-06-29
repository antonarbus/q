import {
  quotationSlice,
  useGetQuotationMutation,
  newQuotationTemplate,
  backToQuotationRef,
} from '@entities/quotation'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect } from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { navItemId } from '@shared/const/navItemId'
import { navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { appSlice } from '@shared/appSlice'
import { useParams } from 'react-router-dom'
import { httpStatus } from '@back/shared/const/httpStatus'
import { asyncDelay } from '@shared/util/delay'

export const useLoadQuotation = (): void => {
  const { quotationId } = useParams()

  const shouldLoadQuotation = useSelector(
    (state) => state.app.shouldLoadQuotation,
  )

  const {
    mutate: getQuotation,
    data,
    isSuccess,
    isError,
    error,
  } = useGetQuotationMutation()

  const getFromWhereToLoadQuotation = (): 'server' | 'template' | 'memory' => {
    if (shouldLoadQuotation.from === 'memory') {
      return 'memory'
    }

    if (shouldLoadQuotation.from === 'template') {
      return 'template'
    }

    if (shouldLoadQuotation.from === 'server') {
      return 'server'
    }

    const shouldAutoDetectFromWhereToLoadQuotation =
      quotationId === undefined || quotationId === 'new'

    if (shouldAutoDetectFromWhereToLoadQuotation === true) {
      return 'template'
      // eslint-disable-next-line no-else-return
    } else {
      return 'server'
    }
  }

  /** Decide which quotation to load on first mount  */
  useEffectOnce(() => {
    const fromWhereToLoad = getFromWhereToLoadQuotation()

    dispatch(
      appSlice.actions.setShouldLoadQuotation({
        yesOrNo: 'yes',
        from: fromWhereToLoad,
      }),
    )
  })

  // quotation loading
  useEffect(() => {
    const loadQuotation = async (): Promise<void> => {
      if (shouldLoadQuotation.yesOrNo === 'yes') {
        const fromWhereToLoad = getFromWhereToLoadQuotation()

        // load previous quotation when user clicks on "< Back" button
        if (fromWhereToLoad === 'memory') {
          dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: 'Going back...',
            }),
          )

          dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))
          dispatch(navSlice.actions.removeUnderlineFromTopNav())

          dispatch(
            navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }),
          )

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

          if (backToQuotationRef.current !== null) {
            dispatch(quotationSlice.actions.resetQuotationReducer())

            await asyncDelay(0)

            dispatch(
              quotationSlice.actions.loadQuotationReducer({
                quotation: backToQuotationRef.current,
              }),
            )

            dispatch(
              appSlice.actions.setShouldLoadQuotation({
                yesOrNo: 'no',
                from: undefined,
              }),
            )
          }

          setTimeout(() => {
            dispatch(appSlice.actions.hideLoadingOverlay())
          }, 1250)
        }

        // load new quotation template
        if (fromWhereToLoad === 'template') {
          dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: 'Loading template...',
            }),
          )

          dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))
          dispatch(navSlice.actions.removeUnderlineFromTopNav())

          dispatch(
            navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }),
          )

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

          dispatch(quotationSlice.actions.resetQuotationReducer())

          await asyncDelay(0)

          dispatch(
            quotationSlice.actions.loadQuotationReducer({
              quotation: newQuotationTemplate,
            }),
          )

          setTimeout(() => {
            dispatch(appSlice.actions.hideLoadingOverlay())
          }, 1250)

          dispatch(
            navSlice.actions.underlineNavItem({ navItemId: navItemId.new }),
          )

          dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )
        }

        // load quotation from server
        if (fromWhereToLoad === 'server') {
          dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: `Loading ${quotationId}...`,
            }),
          )

          if (quotationId !== undefined) {
            getQuotation({ id: quotationId })
          }

          dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )

          dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))
          dispatch(quotationSlice.actions.resetQuotationReducer())
          dispatch(navSlice.actions.removeUnderlineFromTopNav())

          dispatch(
            navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }),
          )

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
        }

        // eslint-disable-next-line require-atomic-updates
        backToQuotationRef.current = null
      }
    }

    void loadQuotation()
  }, [shouldLoadQuotation.yesOrNo])

  // above we triggered quotation loading, now we handle the response
  useUpdateEffect(() => {
    if (isSuccess === true) {
      const { quotation } = data

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
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      if (error.response?.status === httpStatus.forbidden_403) {
        dispatch(
          quotationSlice.actions.loadQuotationReducer({
            quotation: error.response.data.quotation,
          }),
        )

        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Forbidden to view quotation ${quotationId}`,
          }),
        )
      } else if (error.response?.status === httpStatus.notFound_404) {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${quotationId} is not found`,
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
