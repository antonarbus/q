import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { getBoqCellHtmlFromStore, selectColumnWidth, useRow, useItem, Froala, didBoqCellContentChange, updateBoqRowCellAtStore, descriptionCellStyle } from 'client/entities/items'
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
          if (editorRef.current === null) return

          const didContentChange = didBoqCellContentChange({
            editor: editorRef.current,
            itemIndex,
            rowIndex,
            boqColumnKey,
          })

          if (!didContentChange) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: editorRef.current.html.get(),
          })
        }}
        additionalStyle={descriptionCellStyle}
      />
    </Box>
  )
}
