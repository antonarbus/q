import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { OpenShareQuotationModalButton } from '@front/features/open-close/open-share-quotation-modal'
import { OpenInsertMenuButton } from '@front/features/open-close/open-insert-menu'
import { SaveQuotationButton } from './SaveQuotationButton'
import { FooterActionsLayout } from './FooterActionsLayout'
import { DownloadAsPdfButton } from '@front/features/quotation/download-quotation-as-pdf'
import type { FC } from 'react'

export const FooterActions: FC = () => {
  const isEditorView = useIsEditorView()

  return (
    <FooterActionsLayout>
      {isEditorView === true && <OpenInsertMenuButton />}
      {isEditorView === true && <SaveQuotationButton />}
      {isEditorView === true && <OpenShareQuotationModalButton />}
      <DownloadAsPdfButton />
    </FooterActionsLayout>
  )
}
