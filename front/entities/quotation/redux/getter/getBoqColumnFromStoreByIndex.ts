import type { BoqColumnKey, Column } from '@back/entity/quotation/schema'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStoreByIndex = (props: Props): Column | undefined => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return undefined
  }

  const column = block.boq.column[props.boqColumnKey]

  return column
}
