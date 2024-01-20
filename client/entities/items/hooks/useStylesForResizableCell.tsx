import { useSelectorTyped } from '@lib_instances/store'
import { type SxProps } from '@mui/material'
import { type CSSProperties } from 'react'
import { selectColumnWidth } from '../redux/selectors/selectColumnWidth'
import { type BoqColumnKey } from '../types'

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
