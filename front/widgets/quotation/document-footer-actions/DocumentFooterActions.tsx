import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { openShareQuotationModal } from '@front/features/open-close/open-share-quotation-modal'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { openSaveQuotationModal } from '@front/features/open-close/open-save-quotation-modal'
import { Box, IconButton, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { FaRegShareFromSquare } from 'react-icons/fa6'
import { FiDownload, FiSave } from 'react-icons/fi'
import { LuBetweenHorizontalStart } from 'react-icons/lu'

export const DocumentFooterActions = (): React.ReactNode => {
  const isEditorView = useIsEditorView()

  if (isEditorView === false) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        padding: '0px 0px 30px 0px',
        opacity: 0.4,
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 1 },
      }}
    >
      <Tooltip title='Insert'>
        <IconButton
          size='small'
          onClick={(): void => {
            reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }))
          }}
        >
          <LuBetweenHorizontalStart />
        </IconButton>
      </Tooltip>
      <Tooltip title='Save'>
        <IconButton
          size='small'
          onClick={(): void => {
            if (reduxHolder.getState().quotation.id === 'new') {
              openSaveQuotationModal()
            } else {
              saveExistingQuotation()
            }
          }}
        >
          <FiSave />
        </IconButton>
      </Tooltip>
      <Tooltip title='Share'>
        <IconButton onClick={openShareQuotationModal} size='small'>
          <FaRegShareFromSquare />
        </IconButton>
      </Tooltip>
      <Tooltip title='Download'>
        <IconButton
          size='small'
          onClick={(): void => {
            reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.download }))
          }}
        >
          <FiDownload />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
