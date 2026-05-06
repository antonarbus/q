import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { AcceptButton } from '@front/features/blocks/ask-ai-to-suggest-row/AcceptButton'
import { AskAiButton } from '@front/features/blocks/ask-ai-to-suggest-row/AskAiButton'
import { useAiSuggestRow } from '@front/features/blocks/ask-ai-to-suggest-row/AskAiToSuggestRowProvider'
import { CloseAiSuggestRowModalButton } from '@front/features/blocks/close-ai-suggest-row-modal/CloseAiSuggestRowModalButton'
import { closeAiSuggestRowModal } from '@front/features/blocks/close-ai-suggest-row-modal/closeAiSuggestRowModal'

export const AiSuggestRowModalContent = (): React.JSX.Element => {
  const aiSuggestRow = useAiSuggestRow()

  return (
    <Dialog fullWidth={true} maxWidth='sm' onClose={closeAiSuggestRowModal} open={true}>
      <DialogTitle>AI Row Suggestion</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          fullWidth={true}
          label='Describe the item you need'
          multiline={true}
          rows={3}
          sx={{ mt: 1 }}
          value={aiSuggestRow.inputValue}
          onChange={(event) => {
            aiSuggestRow.setInputValue(event.target.value)
          }}
        />
        {aiSuggestRow.mutation.data !== undefined && (
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, marginTop: 2, padding: 2 }}>
            <Typography variant='subtitle2'>Description</Typography>
            <Typography variant='body2'>{aiSuggestRow.mutation.data.description}</Typography>
            <Typography sx={{ mt: 1 }} variant='subtitle2'>
              Price
            </Typography>
            <Typography variant='body2'>{aiSuggestRow.mutation.data.itemPrice}</Typography>
            <Typography sx={{ mt: 1 }} variant='subtitle2'>
              Supplier Notes
            </Typography>
            <Typography variant='body2'>{aiSuggestRow.mutation.data.supplierNotes}</Typography>
          </Box>
        )}
        {aiSuggestRow.mutation.isError && (
          <Typography color='error' sx={{ mt: 1 }}>
            Failed to get AI suggestion. Please try again.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <CloseAiSuggestRowModalButton />
        <AskAiButton />
        <AcceptButton />
      </DialogActions>
    </Dialog>
  )
}
