// oxlint-disable typescript/consistent-type-definitions
import { suggestionReducer } from '@front/entities/suggestion/suggestionSlice'
import { copyReducer } from '@front/entities/copy/copySlice'
import { navReducer } from '@front/entities/nav/navSlice'
import { quotationReducer } from '@front/entities/quotation/redux/quotationSlice'
import { userReducer } from '@front/entities/user/redux/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@front/shared/appSlice'
import { agGridReducer } from '@front/shared/lib/ag-grid/agGridSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    nav: navReducer,
    quotation: quotationReducer,
    suggestion: suggestionReducer,
    copy: copyReducer,
    agGrid: agGridReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
})

// Augment the Register interface in shared so that shared/lib/redux/redux.ts
// derives RootState, AppDispatch etc. from the concrete store — without shared importing app.
declare module '@front/shared/lib/redux/register' {
  interface Register {
    state: ReturnType<typeof store.getState>
    dispatch: typeof store.dispatch
    store: typeof store
  }
}

export const initRedux = (): void => {
  reduxHolder.store = store
}
