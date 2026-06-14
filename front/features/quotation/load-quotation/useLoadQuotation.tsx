import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { newQuotationTemplate } from '@front/entities/quotation/templates/newQuotationTemplate'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { draftQuotationStorage } from '@front/entities/quotation/storage/draftQuotationStorage'
import { appSlice } from '@front/shared/appSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

// True only on the very first mount after a page load/reload. Resets to true on each
// full page reload (module re-evaluates), stays false across SPA navigations.
let isPageLoad = true

export const useLoadQuotation = (): void => {
  const urlParams = useParams()

  const shouldLoadQuotation = reduxHolder.useSelector((state) => state.app.shouldLoadQuotation)

  const getQuotationMutation = useGetQuotationMutation()

  const resolveQuotationSource = (): 'server' | 'template' | 'memory' => {
    if (shouldLoadQuotation.from === 'memory' || shouldLoadQuotation.from === 'draft') {
      return 'memory'
    }

    if (shouldLoadQuotation.from === 'template' || shouldLoadQuotation.from === 'restore') {
      return 'template'
    }

    if (shouldLoadQuotation.from === 'server') {
      return 'server'
    }

    if (urlParams.quotationId === undefined) {
      return 'template'
    }

    if (isPageLoad === true && draftQuotationStorage.load()?.id === urlParams.quotationId) {
      return 'memory'
    }

    return 'server'
  }

  /** Decide which quotation to load on first mount  */
  useEffectOnce(() => {
    const fromWhereToLoad = resolveQuotationSource()
    isPageLoad = false

    const fromToDispatch = ((): 'server' | 'restore' | 'draft' => {
      if (fromWhereToLoad === 'template') {
        return 'restore'
      }
      if (fromWhereToLoad === 'memory') {
        return 'draft'
      }

      return fromWhereToLoad
    })()

    reduxHolder.dispatch(
      appSlice.actions.setShouldLoadQuotation({
        yesOrNo: 'yes',
        from: fromToDispatch,
      }),
    )
  })

  // Quotation loading
  useEffect(() => {
    const loadQuotation = async (): Promise<void> => {
      if (shouldLoadQuotation.yesOrNo === 'yes') {
        const fromWhereToLoad = resolveQuotationSource()

        // Load previous quotation when user clicks on "< Back" button
        if (fromWhereToLoad === 'memory') {
          const savedBackToQuotation = draftQuotationStorage.load()
          const loadingText =
            shouldLoadQuotation.from === 'draft'
              ? `Loading modified ${urlParams.quotationId}...`
              : 'Going back...'

          reduxHolder.dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: loadingText,
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

          if (savedBackToQuotation !== null) {
            reduxHolder.dispatch(quotationSlice.actions.resetQuotation())

            await asyncDelay(0)

            reduxHolder.dispatch(
              quotationSlice.actions.loadQuotation({
                quotation: savedBackToQuotation,
              }),
            )

            if (shouldLoadQuotation.from === 'draft' || shouldLoadQuotation.from === 'memory') {
              reduxHolder.dispatch(appSlice.actions.setQuotationModified())
            }
          }

          reduxHolder.dispatch(
            appSlice.actions.setShouldLoadQuotation({
              yesOrNo: 'no',
              from: undefined,
            }),
          )

          setTimeout(() => {
            reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
          }, 1250)
        }

        // Load new quotation template
        if (fromWhereToLoad === 'template') {
          const draft = shouldLoadQuotation.from === 'restore' ? draftQuotationStorage.load() : null
          const quotationToLoad = draft?.id === 'new' ? draft : newQuotationTemplate

          reduxHolder.dispatch(
            appSlice.actions.showLoadingOverlay({
              shouldShowLoader: true,
              text: draft === null ? 'Loading template...' : 'Loading draft...',
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
              quotation: quotationToLoad,
            }),
          )

          if (draft !== null) {
            reduxHolder.dispatch(appSlice.actions.setQuotationModified())
          }

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

    void loadQuotation()
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
