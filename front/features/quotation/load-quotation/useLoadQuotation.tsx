import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import {
  buildQuotationLoadingText,
  resolveQuotationLoadSourceFromUrl,
} from '@front/entities/quotation/resolveQuotationLoadSource'
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

export const useLoadQuotation = (): void => {
  const urlParams = useParams()

  const quotationLoadRequest = reduxHolder.useSelector((state) => state.app.quotationLoadRequest)

  const getQuotationMutation = useGetQuotationMutation()

  /**
   * Resolve the load source on first mount and trigger the load — but only if nothing
   * else already has. LoadQuotation unmounts when navigating to a sibling route (e.g. the
   * quotation list) and remounts on the way back; Redux state persists across that, so if
   * the "Back" button (or "New", or login) already dispatched an explicit resolution before
   * this remount, re-resolving from the URL here would clobber it with a stale guess.
   */
  useEffectOnce(() => {
    if (quotationLoadRequest.status === 'idle') {
      const quotationLoadSourceFromUrl = resolveQuotationLoadSourceFromUrl({
        urlQuotationId: urlParams.quotationId,
      })

      reduxHolder.dispatch(
        appSlice.actions.setQuotationLoadRequest({
          status: 'pending',
          source: quotationLoadSourceFromUrl.source,
          isModifiedDraft: quotationLoadSourceFromUrl.isModifiedDraft,
        }),
      )
    }
  })

  // Quotation loading — a pure consumer of an already-resolved instruction.
  useEffect(() => {
    const loadQuotation = async (): Promise<void> => {
      if (quotationLoadRequest.status === 'idle') {
        return
      }

      const { source, isModifiedDraft } = quotationLoadRequest

      const loadingText = buildQuotationLoadingText({
        source,
        isModifiedDraft,
        quotationId: urlParams.quotationId,
      })

      // Load previous quotation when user clicks on "< Back" button
      if (source === 'memory') {
        const savedBackToQuotation = draftQuotationStorage.load()

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

          if (isModifiedDraft === true) {
            reduxHolder.dispatch(appSlice.actions.setQuotationModified())
          }
        }

        reduxHolder.dispatch(appSlice.actions.setQuotationLoadRequest({ status: 'idle' }))

        setTimeout(() => {
          reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
        }, 1250)
      }

      // Load new quotation template
      if (source === 'template') {
        const draft = isModifiedDraft === true ? draftQuotationStorage.load() : null
        const quotationToLoad = draft ?? newQuotationTemplate

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

        reduxHolder.dispatch(quotationSlice.actions.resetQuotation())

        await asyncDelay(0)

        reduxHolder.dispatch(
          quotationSlice.actions.loadQuotation({
            quotation: quotationToLoad,
          }),
        )

        if (isModifiedDraft === true) {
          reduxHolder.dispatch(appSlice.actions.setQuotationModified())
        }

        setTimeout(() => {
          reduxHolder.dispatch(appSlice.actions.hideLoadingOverlay())
        }, 1250)

        reduxHolder.dispatch(navSlice.actions.underlineNavItem({ navItemId: navItemId.new }))

        reduxHolder.dispatch(appSlice.actions.setQuotationLoadRequest({ status: 'idle' }))
      }

      // Load quotation from server
      if (source === 'server') {
        reduxHolder.dispatch(
          appSlice.actions.showLoadingOverlay({
            shouldShowLoader: true,
            text: loadingText,
          }),
        )

        if (urlParams.quotationId !== undefined) {
          getQuotationMutation.mutate({ id: urlParams.quotationId })
        }

        reduxHolder.dispatch(appSlice.actions.setQuotationLoadRequest({ status: 'idle' }))

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

    void loadQuotation()
  }, [quotationLoadRequest])

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
