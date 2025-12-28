import { useSelector } from '@shared/lib/redux'
import type { CSSProperties } from 'react'
import type { BoqColumnKey } from '../const/boqColumnKey'
import { selectColumnWidth } from '../redux/selector/selectColumnWidth'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
  minWidth: CSSProperties['minWidth']
}

type Res = CSSProperties

export const useStylesForResizableCell = (props: Props): Res => {
  const columnWidth = useSelector(
    selectColumnWidth({
      blockIndex: props.blockIndex,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const stylesForResizableCell: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    width: columnWidth,
    maxWidth: columnWidth,
    minWidth: props.minWidth ?? '100px',
    padding: '2px',
  }

  return stylesForResizableCell
}
