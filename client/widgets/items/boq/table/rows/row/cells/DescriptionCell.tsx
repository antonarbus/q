import { Box } from '@mui/material'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateDescriptionCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, descriptionCellStyle, useStylesForResizableCell } from '@entities/items'
import type { BoqColumnKey } from '@entities/items'

const boqColumnKey: BoqColumnKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '200px' })

  return (
    <Box
    className={`td ${boqColumnKey}`}
    sx={{ ...stylesForResizableCell, background: 'yellow' }}
    onClick={() => {
      // todo: to set cursor and select on dbClick we need to put also
      // todo: descriptionCellEditorRef into RowProvider
      // todo: also we may need to remove that logic from froala, maybe just move those hooks here
      console.log(666)
    }}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef, itemIndex, rowIndex, boqColumnKey })
        }}
        onClick={() => {
          console.log(555)
        }}
        additionalStyle={{ ...descriptionCellStyle, background: 'red' }}
      />
    </Box>
  )
}
