import { useEffect, useRef } from 'react'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { navSlice } from '@front/shared/nav/navSlice'
import { navItemId } from '@front/shared/nav/navItemId'
import { route } from '@front/shared/lib/react-router-dom/route'

// NavRuntime syncs Redux state into nav item state (disabled, hidden, etc.).
// Rule: if nav state = f(Redux state) at any time, put it here.
// If it's a side effect of a one-time event (page load, auth action), keep it at the call site.

export const NavRuntime = (): null => {
  // --- Payment block: disable nav item when one already exists ---
  const hasPaymentBlock = reduxHolder.useSelector((state) =>
    state.quotation.blocks.some((block) => block.type === 'payment'),
  )

  useEffect(() => {
    reduxHolder.dispatch(
      hasPaymentBlock
        ? navSlice.actions.disableNavItems({ navItemIds: [navItemId.paymentItem] })
        : navSlice.actions.enableNavItems({ navItemIds: [navItemId.paymentItem] }),
    )
  }, [hasPaymentBlock])

  // --- Copy modal: disable top nav while open, restore on close ---
  const isClipboardModalVisible = reduxHolder.useSelector((state) => state.clipboard.isVisible)
  const wasVisibleRef = useRef(false)

  useEffect(() => {
    if (isClipboardModalVisible) {
      wasVisibleRef.current = true

      reduxHolder.dispatch(
        navSlice.actions.disableTopNavItems({
          exceptNavItemIds: [
            navItemId.quotationList,
            navItemId.bookmarkList,
            navItemId.new,
            navItemId.back,
            navItemId.profile,
          ],
        }),
      )

      return
    }

    if (wasVisibleRef.current) {
      wasVisibleRef.current = false

      const isBookmarkPage = globalThis.location.pathname.includes(route.bookmarkList)

      if (isBookmarkPage) {
        reduxHolder.dispatch(
          navSlice.actions.enableTopNavItems({
            exceptNavItemIds: [
              navItemId.save,
              navItemId.pdf,
              navItemId.excel,
              navItemId.insert,
              navItemId.bookmarkList,
            ],
          }),
        )

        return
      }

      const isQuotationListPage = globalThis.location.pathname.includes(route.quotationList)

      if (isQuotationListPage) {
        reduxHolder.dispatch(
          navSlice.actions.enableTopNavItems({
            exceptNavItemIds: [
              navItemId.save,
              navItemId.pdf,
              navItemId.excel,
              navItemId.insert,
              navItemId.quotationList,
            ],
          }),
        )

        return
      }

      reduxHolder.dispatch(navSlice.actions.enableTopNavItems())
    }
  }, [isClipboardModalVisible])

  return null
}
