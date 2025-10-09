import { useSelector } from '@shared/lib/redux'
import type { CSSProperties } from 'react'
import type { BoqColumnKey } from '../const/boqColumnKey'
import { selectColumnWidth } from '../redux/selector/selectColumnWidth'

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
  const columnWidth = useSelector(
    selectColumnWidth({ blockIndex, boqColumnKey }),
  )

  const stylesForResizableCell: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    width: columnWidth,
    maxWidth: columnWidth,
    minWidth,
    padding: '2px',
  }

  return { stylesForResizableCell }
}
