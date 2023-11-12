import { Box } from '@mui/material'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { changeBoqCell } from 'client/features/change_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColumnKey = 'number'

export const NumberCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const numberColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColKey: boqColumnKey }))
  const isNumberColWidthSetManually = numberColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isNumberColWidthSetManually ? 'block' : 'flex',
        width: isNumberColWidthSetManually ? numberColWidth : 'auto',
        maxWidth: isNumberColWidthSetManually ? numberColWidth : 'auto',
        minWidth: '30px',
        flexShrink: 0,
      }}
    >
      <Froala
        itemIndex={itemIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder={boqColumnKey + '...'}
        initHtmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          const html = editorRef.current.html.get()
          changeBoqCell({ itemIndex, rowIndex, boqColumnKey, html })
        }}
        additionalStyle={{
          flexGrow: 1,
        }}
      />
    </Box>
  )
}
