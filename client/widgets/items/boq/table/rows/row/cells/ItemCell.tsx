import { Box } from '@mui/material'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { changeBoqCell } from 'client/features/change_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'

type Props = {
  itemIndex: number
  rowIndex: number
}

const boqColumnKey: BoqColumnKey = 'item'

export const ItemCell = ({ itemIndex, rowIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isItemColWidthSetManually ? itemColWidth : 'auto',
        maxWidth: isItemColWidthSetManually ? itemColWidth : 'auto',
        minWidth: '100px',
      }}
    >
      <Froala
        itemIndex={itemIndex}
        rowIndex={rowIndex}
        editorRef={editorRef}
        froalaElementRef={froalaElementRef}
        placeholder={boqColumnKey + '...'}
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
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
