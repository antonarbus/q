import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { OpenInsertMenuButton } from '@front/features/open-close/open-insert-menu'
import { SaveQuotationButton } from './SaveQuotationButton'
import { FooterActionsLayout } from './FooterActionsLayout'
import { DownloadAsPdfButton } from '@front/features/quotation/download-quotation-as-pdf'
import type { FC } from 'react'

export const FooterActions: FC = () => {
  const isEditorView = useIsEditorView()

  if (isEditorView === false) {
    return null
  }

  return (
    <FooterActionsLayout>
      <OpenInsertMenuButton />
      <SaveQuotationButton />
      <DownloadAsPdfButton />
    </FooterActionsLayout>
  )
}
