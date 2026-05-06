import { Button } from '@mui/material'
import { useAiSuggestRow } from './AskAiToSuggestRowProvider'

export const AskAiButton = (): React.JSX.Element => {
  const aiSuggestRow = useAiSuggestRow()

  return (
    <Button
      disabled={aiSuggestRow.mutation.isPending || aiSuggestRow.inputValue.trim() === ''}
      onClick={(): void => {
        aiSuggestRow.mutation.mutate({ userPrompt: aiSuggestRow.inputValue })
      }}
      variant='outlined'
    >
      {aiSuggestRow.mutation.isPending ? 'Asking...' : 'Ask AI'}
    </Button>
  )
}
