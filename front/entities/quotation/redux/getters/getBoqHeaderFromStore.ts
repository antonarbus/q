import { getState } from '@shared/lib/redux'
import { itemType } from '../../consts/itemType'
import type { HeaderCell, HeaderKey } from '../../types'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderFromStore = ({
  blockIndex,
  boqHeaderKey,
}: Props): HeaderCell | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  return block.boq.header[boqHeaderKey]
}
