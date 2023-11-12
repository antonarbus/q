import { Box } from '@mui/material'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { changeBoqCell } from 'client/features/change_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey, BoqRow } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

const boqColumnKey: BoqColumnKey = 'price'

export const PriceCell = ({ itemIndex, boqRow, rowIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isPriceColWidthSetManually = priceColWidth !== undefined

  return (
    <Box
      className={'td ' + boqColumnKey}
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
        flexShrink: 0,
        width: isPriceColWidthSetManually ? priceColWidth : 'auto',
        maxWidth: isPriceColWidthSetManually ? priceColWidth : 'auto',
        minWidth: '100px',
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
