import { type SxProps } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { useSelectorTyped } from 'client/shared/hooks'
import { type BoqColumnKey } from 'client/shared/types'
import { type CSSProperties } from 'react'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
  minWidth: CSSProperties['minWidth']
}

type Res = {
  stylesForResizableCell: SxProps
}

export const useStylesForResizableCell = ({
  itemIndex,
  boqColumnKey,
  minWidth = '100px',
}: Props): Res => {
  const columnWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isColumnWidthSetManually = columnWidth !== undefined
  const width = isColumnWidthSetManually ? columnWidth : 'auto'
  const maxWidth = width === 'auto' ? minWidth : width

  const stylesForResizableCell: SxProps = {
    display: isColumnWidthSetManually ? 'block' : 'flex',
    position: 'relative',
    flexGrow: 0,
    flexShrink: 0,
    width,
    maxWidth,
    minWidth,
  }

  return { stylesForResizableCell }
}
