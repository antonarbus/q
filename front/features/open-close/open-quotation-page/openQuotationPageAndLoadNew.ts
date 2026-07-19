import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const openQuotationPageAndLoadNew = (): void => {
  // Explicit "New" always forces a blank template, ignoring any saved draft.
  reduxHolder.dispatch(
    appSlice.actions.setQuotationLoadRequest({
      status: 'pending',
      source: 'template',
      isModifiedDraft: false,
    }),
  )

  void routerHolder.router.navigate(route.root)
}
