import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { changeBoqCell } from 'client/features/change_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'

type Props = {
  rowIndex: number
}

const boqColumnKey: BoqColumnKey = 'number'

export const NumberCell = ({ rowIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()
  const numberColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isNumberColWidthSetManually = numberColWidth !== undefined
  const width = isNumberColWidthSetManually ? numberColWidth : 'auto'

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth: width,
        minWidth: '30px',
      }}
    >
      <Froala
        rowIndex={rowIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder=''
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqCell({ itemIndex, rowIndex, boqColumnKey, html })
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
