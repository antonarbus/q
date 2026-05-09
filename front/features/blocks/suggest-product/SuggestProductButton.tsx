import { useProductSuggestion } from '@front/entities/ai/provider/ProductSuggestionProvider'
import { ButtonCustom } from '@front/shared/component/ButtonCustom'

export const SuggestProductButton = (): React.JSX.Element => {
  const productSuggestion = useProductSuggestion()

  return (
    <ButtonCustom
      isButtonDisabled={
        productSuggestion.mutation.isPending || productSuggestion.inputValue.trim() === ''
      }
      isButtonLoading={productSuggestion.mutation.isPending}
      sx={{ width: '200px' }}
      type='button'
      onClick={(): void => {
        productSuggestion.mutation.mutate({ userPrompt: productSuggestion.inputValue })
      }}
    >
      Suggest
    </ButtonCustom>
  )
}
