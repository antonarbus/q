import { aiSuggestRowSlice } from '@front/entities/ai/aiSuggestRowSlice'
import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { AskAiButton } from '@front/features/blocks/ask-ai-to-suggest-row/AskAiButton'
import { useAiSuggestRow } from '@front/features/blocks/ask-ai-to-suggest-row/AskAiToSuggestRowProvider'
import { closeAiSuggestRowModal } from '@front/features/blocks/close-ai-suggest-row-modal/closeAiSuggestRowModal'
import { FormModal } from '@front/shared/component/FormModal'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useAnimatedElement } from '@front/shared/util/useAnimatedElement'
import { Box, TextField, Typography } from '@mui/material'
import { MdAutoAwesome } from 'react-icons/md'

export const AiSuggestRowModalContent = (): React.JSX.Element => {
  const aiSuggestRow = useAiSuggestRow()
  const animatedElement = useAnimatedElement()

  const handleSubmit = (event: React.SubmitEvent): void => {
    event.preventDefault()

    if (aiSuggestRow.mutation.data === undefined) {
      return
    }

    const { blockIndex, rowIndex } = reduxHolder.getState().aiSuggestRow

    const descriptionEditor =
      editorRegistry.get(
        getRegistryKey({ editorName: 'boqBlockDescriptionCell', blockIndex, rowIndex }),
      ) ?? null

    if (descriptionEditor !== null) {
      const html = `<p>${aiSuggestRow.mutation.data.description}</p>`
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
      value: aiSuggestRow.mutation.data.itemPrice,
    })

    reduxHolder.dispatch(aiSuggestRowSlice.actions.close())
  }

  return (
    <FormModal
      additionalButton={<AskAiButton />}
      buttonText={aiSuggestRow.mutation.data === undefined ? undefined : 'Accept'}
      headerIcon={<MdAutoAwesome />}
      headerText='AI Row Suggestion'
      modalRef={animatedElement.ref}
      onCloseClick={closeAiSuggestRowModal}
      onSubmit={handleSubmit}
      onUnmount={closeAiSuggestRowModal}
      shouldUnmountOnClickAway={true}
      shouldUnmountOnEsc={true}
    >
      <TextField
        autoFocus={true}
        fullWidth={true}
        label='Describe the item you need'
        focused={true}
        placeholder='Item description...'
        multiline={true}
        rows={3}
        sx={{ '.MuiInputBase-root': { background: 'white' } }}
        value={aiSuggestRow.inputValue}
        onChange={(event) => {
          aiSuggestRow.setInputValue(event.target.value)
        }}
      />
      {aiSuggestRow.mutation.data !== undefined && (
        <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, padding: 2 }}>
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
        <Typography color='error'>Failed to get AI suggestion. Please try again.</Typography>
      )}
    </FormModal>
  )
}
