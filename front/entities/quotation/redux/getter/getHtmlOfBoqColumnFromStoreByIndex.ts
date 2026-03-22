import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { getState } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getHtmlOfBoqColumnFromStoreByIndex = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return ''
  }

  const columnName = block.boq.column[props.boqColumnKey]

  return columnName.html
}
