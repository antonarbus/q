import { Box } from '@mui/material'
import { getBoqCellHtmlFromStore, selectColumnWidth, useItem, useRow, Froala, updateBoqRowCellAtStore, boqRowCellStyle } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
const boqColumnKey: BoqColumnKey = 'number'

export const NumberCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const numberColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isNumberColWidthSetManually = numberColWidth !== undefined
  const width = isNumberColWidthSetManually ? numberColWidth : 'auto'
  const minWidth = '30px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={editorRef}
        placeholder=''
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: editorRef.current.html.get(),
          })
        }}
        additionalStyle={boqRowCellStyle}
      />
    </Box>
  )
}
