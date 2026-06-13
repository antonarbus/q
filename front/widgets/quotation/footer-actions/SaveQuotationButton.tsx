import { openSaveQuotationModal } from '@front/features/open-close/open-save-quotation-modal'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { IconButton, Tooltip } from '@mui/material'
import type { FC } from 'react'
import { FiSave } from 'react-icons/fi'

export const SaveQuotationButton: FC = () => {
  return (
    <Tooltip title='Save'>
      <IconButton
        size='small'
        onClick={(): void => {
          if (reduxHolder.getState().quotation.id === 'new') {
            openSaveQuotationModal()
          } else {
            void saveExistingQuotation()
          }
        }}
      >
        <FiSave />
      </IconButton>
    </Tooltip>
  )
}
