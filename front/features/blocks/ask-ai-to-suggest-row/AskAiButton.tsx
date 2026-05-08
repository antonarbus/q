import { ButtonCustom } from '@front/shared/component/ButtonCustom'
import { useAiSuggestRow } from './AskAiToSuggestRowProvider'

export const AskAiButton = (): React.JSX.Element => {
  const aiSuggestRow = useAiSuggestRow()

  return (
    <ButtonCustom
      isButtonDisabled={aiSuggestRow.mutation.isPending || aiSuggestRow.inputValue.trim() === ''}
      isButtonLoading={aiSuggestRow.mutation.isPending}
      sx={{ width: '200px' }}
      type='button'
      onClick={(): void => {
        aiSuggestRow.mutation.mutate({ userPrompt: aiSuggestRow.inputValue })
      }}
    >
      Ask
    </ButtonCustom>
  )
}
