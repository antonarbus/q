import { useSuggestion } from '@front/entities/suggestion/provider/SuggestionProvider'
import { SuggestProductButton } from './SuggestProductButton'
import { closeSuggestModal } from '@front/features/blocks/close-suggest-modal/closeSuggestModal'
import { FormModal } from '@front/shared/component/FormModal'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { TextField } from '@mui/material'
import { MdAutoAwesome } from 'react-icons/md'

export const SuggestionModalContent = (): React.JSX.Element => {
  const suggestion = useSuggestion()
  const animatedElement = useAnimatedElement()

  return (
    <FormModal
      additionalButton={<SuggestProductButton />}
      headerIcon={<MdAutoAwesome />}
      headerText='Product suggestion'
      modalRef={animatedElement.ref}
      onCloseClick={closeSuggestModal}
      onUnmount={closeSuggestModal}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
    >
      <TextField
        autoFocus={true}
        focused={true}
        fullWidth={true}
        label='What product do you need?'
        multiline={true}
        placeholder='Description...'
        rows={3}
        sx={{ '.MuiInputBase-root': { background: 'white' } }}
        value={suggestion.inputValue}
        onChange={(event) => {
          suggestion.setInputValue(event.target.value)
        }}
      />
    </FormModal>
  )
}
