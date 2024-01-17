import { type SxProps } from '@mui/material'
import { type CSSProperties } from 'react'
import { useSelectorTyped } from '@shared/hooks'
import { type BoqColumnKey } from '@shared/types'
import { selectColumnWidth } from '../redux/selectors/selectColumnWidth'

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

  const stylesForResizableCell: SxProps = {
    display: 'block',
    position: 'relative',
    width: columnWidth,
    maxWidth: columnWidth,
    minWidth,
  }

  return { stylesForResizableCell }
}
