import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { newQuotationTemplate } from '@front/entities/quotation/templates/newQuotationTemplate'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { backToQuotationRef } from '@front/entities/quotation/ref/backToQuotationRef'
import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const useLoadQuotation = (): void => {
  const urlParams = useParams()

  const shouldLoadQuotation = reduxHolder.useSelector((state) => state.app.shouldLoadQuotation)

  const getQuotationMutation = useGetQuotationMutation()

  const resolveQuotationSource = (): 'server' | 'template' | 'memory' => {
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
    const fromWhereToLoad = resolveQuotationSource()

    reduxHolder.dispatch(
      appSlice.actions.setShouldLoadQuotation({
        yesOrNo: 'yes',
        from: fromWhereToLoad,
      }),
    )
  })

  // Quotation loading
  useEffect(() => {
    const loadQuotation = async (): Promise<void> => {
      if (shouldLoadQuotation.yesOrNo === 'yes') {
        const fromWhereToLoad = resolveQuotationSource()
        backToQuotationRef.current = null

        // Load previous quotation when user clicks on "< Back" button
        if (fromWhereToLoad === 'memory') {
          reduxHolder.dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: 'Going back...',
            }),
          )

          reduxHolder.dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))

          reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

          reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }))

          reduxHolder.dispatch(
            navSlice.actions.enableNavItems({
              navItemIds: [
                navItemId.save,
                navItemId.pdf,
                navItemId.excel,
                navItemId.share,
                navItemId.download,
                navItemId.insert,
              ],
            }),
          )

          if (backToQuotationRef.current !== null) {
            reduxHolder.dispatch(quotationSlice.actions.resetQuotation())

            await asyncDelay(0)

            reduxHolder.dispatch(
              quotationSlice.actions.loadQuotation({
                quotation: backToQuotationRef.current,
              }),
            )

            reduxHolder.dispatch(
              appSlice.actions.setShouldLoadQuotation({
                yesOrNo: 'no',
                from: undefined,
              }),
            )
          }

          setTimeout(() => {
            reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
          }, 1250)
        }

        // Load new quotation template
        if (fromWhereToLoad === 'template') {
          reduxHolder.dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: 'Loading template...',
            }),
          )

          reduxHolder.dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))

          reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

          reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }))

          reduxHolder.dispatch(
            navSlice.actions.enableNavItems({
              navItemIds: [
                navItemId.save,
                navItemId.pdf,
                navItemId.excel,
                navItemId.share,
                navItemId.download,
                navItemId.insert,
              ],
            }),
          )

          reduxHolder.dispatch(quotationSlice.actions.resetQuotation())

          await asyncDelay(0)

          reduxHolder.dispatch(
            quotationSlice.actions.loadQuotation({
              quotation: newQuotationTemplate,
            }),
          )

          setTimeout(() => {
            reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
          }, 1250)

          reduxHolder.dispatch(navSlice.actions.underlineNavItem({ navItemId: navItemId.new }))

          reduxHolder.dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )
        }

        // Load quotation from server
        if (fromWhereToLoad === 'server') {
          reduxHolder.dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: `Loading ${urlParams.quotationId}...`,
            }),
          )

          if (urlParams.quotationId !== undefined) {
            getQuotationMutation.mutate({ id: urlParams.quotationId })
          }

          reduxHolder.dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )

          reduxHolder.dispatch(appSlice.actions.setBackgroundMessage({ message: '' }))

          reduxHolder.dispatch(quotationSlice.actions.resetQuotation())
          reduxHolder.dispatch(navSlice.actions.removeUnderlineFromTopNav())

          reduxHolder.dispatch(navSlice.actions.hideNavItems({ navItemIds: [navItemId.back] }))

          reduxHolder.dispatch(
            navSlice.actions.enableNavItems({
              navItemIds: [
                navItemId.save,
                navItemId.pdf,
                navItemId.excel,
                navItemId.share,
                navItemId.download,
                navItemId.insert,
              ],
            }),
          )
        }
      }
    }

    loadQuotation()
  }, [shouldLoadQuotation.yesOrNo])

  // Above we triggered quotation loading, now we handle the response
  useUpdateEffect(() => {
    if (getQuotationMutation.isSuccess === true) {
      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: getQuotationMutation.data.quotation,
        }),
      )

      if (getQuotationMutation.data.quotation.permissionLevel === 'FORBIDDEN') {
        reduxHolder.dispatch(
          quotationSlice.actions.loadQuotation({
            quotation: getQuotationMutation.data.quotation,
          }),
        )

        reduxHolder.dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Forbidden to view quotation ${urlParams.quotationId}`,
          }),
        )
      }

      reduxHolder.dispatch(
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
        reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
      }, 1250)
    }
  }, [getQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (getQuotationMutation.isError === true) {
      if (getQuotationMutation.error.response?.data.errorCode === 'QUOTATION_NOT_FOUND') {
        reduxHolder.dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${urlParams.quotationId} not found`,
          }),
        )
      }

      if (getQuotationMutation.error.response?.data.errorCode === 'QUOTATION_STORAGE_NOT_FOUND') {
        reduxHolder.dispatch(
          appSlice.actions.setBackgroundMessage({
            message: `Quotation ${urlParams.quotationId} not found, probably deleted`,
          }),
        )
      }

      if (getQuotationMutation.error.response?.data.errorCode === 'INTERNAL_ERROR') {
        toast.error('Internal error')

        reduxHolder.dispatch(appSlice.actions.setBackgroundMessage({ message: 'Internal error' }))
      }

      setTimeout(() => {
        reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
      }, 1250)
    }
  }, [getQuotationMutation.isError])
}
