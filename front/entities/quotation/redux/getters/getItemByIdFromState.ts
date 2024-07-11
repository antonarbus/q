import { type Quotation, type Item, type ItemBoq } from '../../types'

type Props = {
  id: string
  state: Quotation
}

export const getItemByIdFromState = ({
  id,
  state,
}: Props): Item | undefined => {
  const item = state.items.find((item) => {
    return item.id === id
  })

  if (item) return item

  // todo: convert into for-of
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let itemIndex = 0; itemIndex < state.items.length; itemIndex++) {
    const item = state.items[itemIndex]

    if (item?.type === 'boq') {
      for (let rowIndex = 0; rowIndex < item.boq.rows.length; rowIndex++) {
        if (item.boq.rows[rowIndex]?.id === id) {
          const boqRow = (state.items[itemIndex] as ItemBoq).boq.rows[rowIndex]
          return boqRow
        }
      }
    }
  }

  return undefined
}
