import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { updateBoqCell } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { useItem } from 'client/widgets/items/ItemProvider'
import { useRow } from '../../RowProvider'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined
  const width = isQtyColWidthSetManually ? qtyColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
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
