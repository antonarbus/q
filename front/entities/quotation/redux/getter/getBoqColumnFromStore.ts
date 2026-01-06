import type { BoqColumnKey, Column } from '@back/entities/quotation/schemas'
import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = (props: Props): Column | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  const column = block.boq.column[props.boqColumnKey]

  return column
}
