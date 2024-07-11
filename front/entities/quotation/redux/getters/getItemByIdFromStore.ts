import { getState } from '@lib_instances/store'
import { type Item, type ItemBoq } from '../../types'

type Props = {
  id: string
}

export const getItemByIdFromStore = ({ id }: Props): Item | undefined => {
  const quotation = getState().quotation

  const item = quotation.items.find((item) => {
    return item.id === id
  })

  if (item) return item

  // todo: convert into for-of
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let itemIndex = 0; itemIndex < quotation.items.length; itemIndex++) {
    const item = quotation.items[itemIndex]

    if (item?.type === 'boq') {
      for (let rowIndex = 0; rowIndex < item.boq.rows.length; rowIndex++) {
        if (item.boq.rows[rowIndex]?.id === id) {
          const boqRow = (quotation.items[itemIndex] as ItemBoq).boq.rows[
            rowIndex
          ]
          return boqRow
        }
      }
    }
  }

  return undefined
}
