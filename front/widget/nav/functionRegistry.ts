import {
  insertBoqBlock,
  insertPriceBlock,
  insertRow,
  insertTextBlock,
} from '@feature/blocks/insert'
import { openBookmarksPage } from '@feature/open-close/open-bookmarks-page'
import { openLoginModal } from '@feature/open-close/open-login-modal'
import {
  openQuotationPageAndLoadNew,
  openQuotationPageAndLoadPrev,
} from '@feature/open-close/open-quotation-page'
import { openQuotationsPage } from '@feature/open-close/open-quotations-page'
import { openSaveQuotationModal } from '@feature/open-close/open-save-quotation-modal'
import { openSettingsModal } from '@feature/open-close/open-settings-modal'
import { openShareQuotationModal } from '@feature/open-close/open-share-quotation-modal'
import { downloadExcel } from '@feature/quotation/download-quotation-as-excel'
import { downloadPdf } from '@feature/quotation/download-quotation-as-pdf'
import { saveExistingQuotation } from '@feature/quotation/save-quotation'
import { getState } from '@shared/lib/redux'

/** Required to avoid storing non-serializable values in Redux store */
export const functionRegistry = {
  openQuotationPageAndLoadPrev,
  openQuotationPageAndLoadNew,
  saveQuotation: (): void => {
    if (getState().quotation.id === 'new') {
      openSaveQuotationModal()
    } else {
      void saveExistingQuotation()
    }
  },
  openShareQuotationModal,
  downloadPdf,
  downloadExcel,
  insertBoqBlock,
  insertRow,
  insertTextBlock,
  insertPriceBlock,
  openBookmarksPage,
  openQuotationsPage,
  openLoginModal,
  openSettingsModal,
} as const

export type FunctionId = keyof typeof functionRegistry
