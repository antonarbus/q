import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { newQuotationTemplate } from '@front/entities/quotation/newQuotationTemplate'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { appSlice } from '@front/shared/appSlice'
import { dispatch, useSelector } from '@front/shared/lib/redux'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const useLoadQuotation = (): void => {
  const urlParams = useParams()

  const shouldLoadQuotation = useSelector(
    (state) => state.app.shouldLoadQuotation,
  )

  const getQuotationMutation = useGetQuotationMutation()

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
      urlParams.quotationId === undefined || urlParams.quotationId === 'new'

    if (shouldAutoDetectFromWhereToLoadQuotation === true) {
      return 'template'
    }

    return 'server'
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
        backToQuotationRef.current = null

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
            dispatch(quotationSlice.actions.resetQuotation())

            await asyncDelay(0)

            dispatch(
              quotationSlice.actions.loadQuotation({
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

          dispatch(quotationSlice.actions.resetQuotation())

          await asyncDelay(0)

          dispatch(
            quotationSlice.actions.loadQuotation({
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
              text: `Loading ${urlParams.quotationId}...`,
            }),
          )

          if (urlParams.quotationId !== undefined) {
            getQuotationMutation.mutate({ id: urlParams.quotationId })
          }

          dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )

          dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))
          dispatch(quotationSlice.actions.resetQuotation())
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
      }
    }

    void loadQuotation()
  }, [shouldLoadQuotation.yesOrNo])

  // above we triggered quotation loading, now we handle the response
  useUpdateEffect(() => {
    if (getQuotationMutation.isSuccess === true) {
      dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: getQuotationMutation.data.quotation,
        }),
      )

      if (getQuotationMutation.data.quotation.permissionLevel === 'FORBIDDEN') {
        dispatch(
          quotationSlice.actions.loadQuotation({
            quotation: getQuotationMutation.data.quotation,
          }),
        )

        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Forbidden to view quotation ${urlParams.quotationId}`,
          }),
        )
      }

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
  }, [getQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (getQuotationMutation.isError === true) {
      if (
        getQuotationMutation.error.response?.data.errorCode ===
        'QUOTATION_NOT_FOUND'
      ) {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${urlParams.quotationId} not found`,
          }),
        )
      }

      if (
        getQuotationMutation.error.response?.data.errorCode ===
        'QUOTATION_STORAGE_NOT_FOUND'
      ) {
        dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${urlParams.quotationId} not found, probably deleted`,
          }),
        )
      }

      if (
        getQuotationMutation.error.response?.data.errorCode === 'INTERNAL_ERROR'
      ) {
        toast.error('Internal error')

        dispatch(
          appSlice.actions.setBackgroundMessage({ message: 'Internal error' }),
        )
      }

      setTimeout(() => {
        dispatch(appSlice.actions.hideLoadingOverlay())
      }, 1250)
    }
  }, [getQuotationMutation.isError])
}
