import { useSelector } from '@shared/lib/redux'
import { selectColumnWidth } from '../redux/selector/selectColumnWidth'
import type { BoqColumnKey } from '@back/entity/quotation/schema'
import type { CSSObject } from '@mui/material'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
  minWidth: CSSObject['minWidth']
}

export const useStylesForResizableCell = (props: Props): CSSObject => {
  const columnWidth = useSelector(
    selectColumnWidth({
      blockIndex: props.blockIndex,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const stylesForResizableCell: CSSObject = {
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
