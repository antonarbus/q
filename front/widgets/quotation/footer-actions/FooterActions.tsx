import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { OpenShareQuotationModalButton } from '@front/features/open-close/open-share-quotation-modal'
import { OpenInsertMenuButton } from '@front/features/open-close/open-insert-menu'
import { SaveQuotationButton } from './SaveQuotationButton'
import { OpenDownloadMenuButton } from '@front/features/open-close/open-download-menu'
import { FooterActionsLayout } from './FooterActionsLayout'
import type { FC } from 'react'

export const FooterActions: FC = () => {
  const isEditorView = useIsEditorView()

  return (
    <FooterActionsLayout>
      {isEditorView === false && <OpenInsertMenuButton />}
      {isEditorView === false && <SaveQuotationButton />}
      {isEditorView === false && <OpenShareQuotationModalButton />}
      <OpenDownloadMenuButton />
    </FooterActionsLayout>
  )
}
