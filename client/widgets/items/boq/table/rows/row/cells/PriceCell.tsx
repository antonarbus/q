import { Box } from '@mui/material'
import { dispatch, getState, theme } from 'client/shared/clients'
import { boqCellHtmlGetter, itemsSlice, selectColumnWidth } from 'client/entities/items'
import { changeBoqCell } from 'client/features/change_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey, BoqItem } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { useBoqItemEditors } from 'client/widgets/items/boq/BoqEditorsContext'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'
import { useRow } from '../../RowProvider'

const boqColumnKey: BoqColumnKey = 'price'

export const PriceCell = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()
  const { rowIndex } = useRow()
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isPriceColWidthSetManually = priceColWidth !== undefined
  const width = isPriceColWidthSetManually ? priceColWidth : 'auto'

  const boqItemEditors = useBoqItemEditors()

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
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
          changeBoqCell({ itemIndex, rowIndex, boqColumnKey, html })
          dispatch(itemsSlice.actions.updateTotalPrice({ itemIndex }))

          // todo: make it better
          const updatedPrice = (getState().items[itemIndex] as BoqItem).boq.header.price.html

          if (boqItemEditors.subTotalEditorRef.current) {
            boqItemEditors.subTotalEditorRef.current.html.set(updatedPrice)
          }
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
