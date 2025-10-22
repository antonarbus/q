import {
  insertBoqBlock,
  insertPriceBlock,
  insertRow,
  insertTextBlock,
} from '@features/blocks/insert'
import { openBookmarksPage } from '@features/open-close/open-bookmarks-page'
import { openLoginModal } from '@features/open-close/open-login-modal'
import {
  openQuotationPageAndLoadNew,
  openQuotationPageAndLoadPrev,
} from '@features/open-close/open-quotation-page'
import { openQuotationsPage } from '@features/open-close/open-quotations-page'
import { openSaveQuotationModal } from '@features/open-close/open-save-quotation-modal'
import { openSettingsModal } from '@features/open-close/open-settings-modal'
import { openShareQuotationModal } from '@features/open-close/open-share-quotation-modal'
import { downloadExcel } from '@features/quotation/download-quotation-as-excel'
import { downloadPdf } from '@features/quotation/download-quotation-as-pdf'
import { saveExistingQuotation } from '@features/quotation/save-quotation'
import { getState } from '@shared/lib/redux'

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
