import { useSelector } from '@shared/lib/redux'
import type { CSSProperties } from 'react'
import { selectColumnWidth } from '../redux/selector/selectColumnWidth'
import type { BoqColumnKey } from '@back/entities/quotation/schemas'

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
