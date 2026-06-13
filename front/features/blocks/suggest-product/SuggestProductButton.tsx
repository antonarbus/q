import { useSuggestion } from '@front/entities/suggestion/provider/SuggestionProvider'
import { useSuggestionMutation } from '@front/entities/suggestion/api/useSuggestionMutation'
import { ButtonCustom } from '@front/shared/component/ButtonCustom'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { suggestProduct } from './suggestProduct'

export const SuggestProductButton = (): React.JSX.Element => {
  const { inputValue } = useSuggestion()
  const { blockIndex, rowIndex } = reduxHolder.useSelector((state) => state.suggestion)
  const mutation = useSuggestionMutation()

  return (
    <ButtonCustom
      isButtonDisabled={inputValue.trim() === ''}
      isButtonLoading={mutation.isPending}
      sx={{ width: '200px' }}
      type='button'
      onClick={() =>
        void (async (): Promise<void> => {
          await suggestProduct({
            blockIndex,
            rowIndex,
            userPrompt: inputValue,
            mutateAsync: mutation.mutateAsync,
          })
        })()
      }
    >
      Suggest
    </ButtonCustom>
  )
}
