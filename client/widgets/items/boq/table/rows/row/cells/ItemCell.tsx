import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { updateBoqCell } from 'client/features/change_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { useItem } from 'client/widgets/items/ItemProvider'
import { useRow } from '../../RowProvider'

const boqColumnKey: BoqColumnKey = 'item'

export const ItemCell = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined
  const width = isItemColWidthSetManually ? itemColWidth : 'auto'

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth: width,
        minWidth: '100px',
      }}
    >
      <Froala
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder={`${boqColumnKey}...`}
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          updateBoqCell({ itemIndex, rowIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          textAlign: 'center',
          padding: theme.cell.padding,
          '.fr-placeholder': {
            left: '15px',
          },
          minHeight: '44px', // otherwise placeholder is misplaced on init
          '.fr-wrapper': {
            minHeight: '24px', // otherwise placeholder is misplaced on init
          },
        }}
      />
    </Box>
  )
}
