import { suggestionSlice } from '@front/entities/suggestion/suggestionSlice'
import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { SuggestProductButton } from '@front/features/blocks/suggest-product/SuggestProductButton'
import { useSuggestion } from '@front/entities/suggestion/provider/SuggestionProvider'
import { closeSuggestModal } from '@front/features/blocks/close-suggest-modal/closeSuggestModal'
import { FormModal } from '@front/shared/component/FormModal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { Box, TextField, Typography } from '@mui/material'
import { MdAutoAwesome } from 'react-icons/md'

export const SuggestionModalContent = (): React.JSX.Element => {
  const suggestion = useSuggestion()
  const animatedElement = useAnimatedElement()

  const handleSubmit = (event: React.SubmitEvent): void => {
    event.preventDefault()

    if (suggestion.mutation.data === undefined) {
      return
    }

    const { blockIndex, rowIndex } = reduxHolder.getState().suggestion

    const descriptionEditor =
      editorRegistry.get(
        getRegistryKey({ editorName: 'boqBlockDescriptionCell', blockIndex, rowIndex }),
      ) ?? null

    if (descriptionEditor !== null) {
      const html = `<p>${suggestion.mutation.data.description}</p>`
      descriptionEditor.commands.setContent(html, { emitUpdate: false })
      updateCellAtStore({ blockIndex, rowIndex, cellKey: 'description', html })
    }

    const priceEditor =
      editorRegistry.get(
        getRegistryKey({ editorName: 'boqBlockItemPriceCell', blockIndex, rowIndex }),
      ) ?? null

    updateCellWithValue({
      blockIndex,
      rowIndex,
      cellKey: 'itemPrice',
      editor: priceEditor,
      value: suggestion.mutation.data.itemPrice,
    })

    reduxHolder.dispatch(suggestionSlice.actions.close())
  }

  return (
    <FormModal
      additionalButton={<SuggestProductButton />}
      buttonText={suggestion.mutation.data === undefined ? undefined : 'Accept'}
      headerIcon={<MdAutoAwesome />}
      headerText='Product suggestion'
      modalRef={animatedElement.ref}
      onCloseClick={closeSuggestModal}
      onSubmit={handleSubmit}
      onUnmount={closeSuggestModal}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
    >
      <TextField
        autoFocus={true}
        fullWidth={true}
        label='Describe the product you need'
        focused={true}
        placeholder='Description...'
        multiline={true}
        rows={3}
        sx={{ '.MuiInputBase-root': { background: 'white' } }}
        value={suggestion.inputValue}
        onChange={(event) => {
          suggestion.setInputValue(event.target.value)
        }}
      />
      {suggestion.mutation.data !== undefined && (
        <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, padding: 2 }}>
          <Typography variant='subtitle2'>Description</Typography>
          <Typography variant='body2'>{suggestion.mutation.data.description}</Typography>
          <Typography sx={{ mt: 1 }} variant='subtitle2'>
            Price
          </Typography>
          <Typography variant='body2'>{suggestion.mutation.data.itemPrice}</Typography>
          <Typography sx={{ mt: 1 }} variant='subtitle2'>
            Supplier Notes
          </Typography>
          <Typography variant='body2'>{suggestion.mutation.data.supplierNotes}</Typography>
        </Box>
      )}
      {suggestion.mutation.isError && (
        <Typography color='error'>Failed to get AI suggestion. Please try again.</Typography>
      )}
    </FormModal>
  )
}
