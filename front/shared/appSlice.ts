import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@shared/lib/nanoid'

type State = {
  quotationKey: string
  quotationSource: 'template' | 'server' | 'previous'
  quotationIdToBeOpened: string
  backgroundMessage: string
  loadingOverlay: {
    showLoader: boolean
    text: string
  }
}

const pathSegments = window.location.pathname.split('/')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const quotationId = pathSegments.length > 1 ? pathSegments[1]! : 'new'

const quotationSource: State['quotationSource'] =
  quotationId === 'new' ? 'template' : 'server'

const initialState: State = {
  quotationKey: nanoid(5),
  quotationSource,
  quotationIdToBeOpened: quotationId,
  backgroundMessage: '',
  loadingOverlay: {
    showLoader: false,
    text: '',
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reRenderQuotation: (state) => {
      state.quotationKey = nanoid(5)
    },
    setBackgroundMessage: (
      state,
      action: PayloadAction<{ message: State['backgroundMessage'] }>,
    ) => {
      const { message } = action.payload
      state.backgroundMessage = message
    },
    showLoadingOverlay: (
      state,
      action: PayloadAction<State['loadingOverlay']>,
    ) => {
      const { showLoader, text } = action.payload
      state.loadingOverlay.showLoader = showLoader
      state.loadingOverlay.text = text
    },
    hideLoadingOverlay: (state) => {
      state.loadingOverlay.showLoader = false
      state.loadingOverlay.text = ''
    },
    setQuotationSource: (
      state,
      action: PayloadAction<{
        quotationSource: State['quotationSource']
      }>,
    ) => {
      const { quotationSource: source } = action.payload
      state.quotationSource = source
    },
    setQuotationIdToBeOpened: (
      state,
      action: PayloadAction<{
        quotationIdToBeOpened: State['quotationIdToBeOpened']
      }>,
    ) => {
      const { quotationIdToBeOpened } = action.payload
      state.quotationIdToBeOpened = quotationIdToBeOpened
    },
  },
})

export const appReducer = appSlice.reducer
