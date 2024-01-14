import { Box } from '@mui/material'
import { getBoqCellHtmlFromStore, selectColumnWidth, useRow, useItem, Froala, descriptionCellStyle } from 'client/entities/items'
import { updateDescriptionCell } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'

const boqColumnKey: BoqColumnKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isDescriptionColWidthSetManually = descriptionColWidth !== undefined
  const width = isDescriptionColWidthSetManually ? descriptionColWidth : 'auto'
  const minWidth = '200px'
  const maxWidth = width

  // re-render component to calculated height of static html during item width change
  // it will trigger useEffect at <StaticHtml />
  useSelectorTyped(state => state.items[itemIndex]?.width)

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isDescriptionColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
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
