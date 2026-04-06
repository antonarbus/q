import { copyBoqBlockTemplate } from '@front/features/blocks/copy-template/copyBoqBlockTemplate'
import { copyPaymentBlockTemplate } from '@front/features/blocks/copy-template/copyPaymentBlockTemplate'
import { copyPriceBlockTemplate } from '@front/features/blocks/copy-template/copyPriceBlockTemplate'
import { copyRowBlockTemplate } from '@front/features/blocks/copy-template/copyRowTemplate'
import { copyTextBlockTemplate } from '@front/features/blocks/copy-template/copyTextBlockTemplate'
import { openBookmarksPage } from '@front/features/open-close/open-bookmarks-page'
import { openLoginModal } from '@front/features/open-close/open-login-modal'
import {
  openQuotationPageAndLoadNew,
  openQuotationPageAndLoadPrev,
} from '@front/features/open-close/open-quotation-page'
import { openQuotationsPage } from '@front/features/open-close/open-quotations-page'
import { openSaveQuotationModal } from '@front/features/open-close/open-save-quotation-modal'
import { openSettingsModal } from '@front/features/open-close/open-settings-modal'
import { openShareQuotationModal } from '@front/features/open-close/open-share-quotation-modal'
import { downloadExcel } from '@front/features/quotation/download-quotation-as-excel'
import { downloadPdf } from '@front/features/quotation/download-quotation-as-pdf'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

/** Required to avoid storing non-serializable values in Redux store */
export const functionRegistry = {
  openQuotationPageAndLoadPrev,
  openQuotationPageAndLoadNew,
  saveQuotation: (): void => {
    if (reduxHolder.getState().quotation.id === 'new') {
      openSaveQuotationModal()
    } else {
      saveExistingQuotation()
    }
  },
  openShareQuotationModal,
  downloadPdf,
  downloadExcel,
  insertBoqBlock: copyBoqBlockTemplate,
  insertRow: copyRowBlockTemplate,
  insertTextBlock: copyTextBlockTemplate,
  insertPriceBlock: copyPriceBlockTemplate,
  insertPaymentBlock: copyPaymentBlockTemplate,
  openBookmarksPage,
  openQuotationsPage,
  openLoginModal,
  openSettingsModal,
} as const

export type FunctionId = keyof typeof functionRegistry
