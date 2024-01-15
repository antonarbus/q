import { Box } from '@mui/material'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, descriptionCellStyle } from 'client/entities/items'
import { updateDescriptionCell } from 'client/features/update_cell'
import type { BoqColumnKey } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { useStylesForResizableCell } from './useStylesForResizableCell'

const boqColumnKey: BoqColumnKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '200px' })

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={stylesForResizableCell}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef, itemIndex, rowIndex, boqColumnKey })
        }}
        additionalStyle={descriptionCellStyle}
      />
    </Box>
  )
}
