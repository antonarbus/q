import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { getNumber, getTextContent } from 'client/shared/lib'
import type { BoqColumnKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqCell = ({
  html,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  const prevHtml = row[boqColumnKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  const textContent = getTextContent({ html })
  const value = getNumber({ string: textContent })

  dispatch(itemsSlice.actions.updateBoqCell({
    itemIndex,
    rowIndex,
    html,
    value,
    boqColumnKey,
  }))
}
