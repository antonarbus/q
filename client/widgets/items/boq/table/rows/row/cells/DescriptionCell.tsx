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
        flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={editorRef}
        placeholder={`${boqColumnKey}...`}
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (editorRef.current === null) return
          updateBoqCell({ itemIndex, rowIndex, boqColumnKey, html: editorRef.current.html.get() })
        }}
        additionalStyle={{
          padding: theme.cell.padding,
          minHeight: '44px', // otherwise placeholder is misplaced on init
          '.fr-wrapper': {
            minHeight: '24px', // otherwise placeholder is misplaced on init
          },
        }}
      />
    </Box>
  )
}
