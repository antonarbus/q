import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { BoqColumnKey } from '@entities/quotation/const/boqColumnKey'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = ({
  blockIndex,
  boqColumnKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  const { html } = block.boq.column[boqColumnKey]

  return html
}
