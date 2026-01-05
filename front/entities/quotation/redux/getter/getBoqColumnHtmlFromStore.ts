import type { BoqColumnKey } from '@back/entities/quotation/quotationSchema'
import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return ''
  }

  const columnName = block.boq.column[props.boqColumnKey]

  return columnName.html
}
