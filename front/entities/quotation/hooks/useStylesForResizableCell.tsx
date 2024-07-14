import { useSelectorTyped } from '@lib_instances/store'
import { type CSSProperties } from 'react'
import { selectColumnWidth } from '../redux/selectors/selectColumnWidth'
import { type BoqColumnKey } from '../types'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
  minWidth: CSSProperties['minWidth']
}

type Res = {
  stylesForResizableCell: CSSProperties
}

export const useStylesForResizableCell = ({
  blockIndex,
  boqColumnKey,
  minWidth = '100px',
}: Props): Res => {
  const columnWidth = useSelectorTyped(
    selectColumnWidth({ blockIndex, boqColumnKey }),
  )

  const stylesForResizableCell: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    width: columnWidth,
    maxWidth: columnWidth,
    minWidth,
  }

  return { stylesForResizableCell }
}
