import { Button } from '@mui/material'
import { closeAiSuggestRowModal } from './closeAiSuggestRowModal'

export const CloseAiSuggestRowModalButton = (): React.JSX.Element => (
  <Button onClick={closeAiSuggestRowModal}>Cancel</Button>
)
