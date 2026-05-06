import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { Button } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useAiSuggestRow } from './AskAiToSuggestRowProvider'
import { aiSuggestRowSlice } from '@front/entities/ai/aiSuggestRowSlice'

export const AcceptButton = (): React.JSX.Element | null => {
  const aiSuggestRow = useAiSuggestRow()

  if (aiSuggestRow.mutation.data === undefined) {
    return null
  }

  return (
    <Button
      variant='contained'
      onClick={(): void => {
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
      }}
    >
      Accept
    </Button>
  )
}
