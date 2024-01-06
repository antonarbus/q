import { useSelectorTyped } from 'client/shared/hooks'
import { useRow } from '../providers/RowProvider'
import { VscPinned } from 'react-icons/vsc'
import { selectBoqRowCellPin } from '../redux/selectors/selectBoqRowCellPin'
import { useItem } from '../providers/ItemProvider'
import { type BoqColumnKey } from 'client/shared/types'
import { type ReactNode } from 'react'

type Props = {
  boqColumnKey: BoqColumnKey
}

export const Pin = ({ boqColumnKey }: Props): ReactNode => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const pin = useSelectorTyped(selectBoqRowCellPin({ itemIndex, rowIndex, boqColumnKey }))

  if (pin === undefined) return null
  if (!pin.isDisplayed) return null

  return (
    <VscPinned
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        rotate: '35deg',
        fill: '#a6a4a4f5',
        cursor: 'pointer',
      }}
      onClick={() => {
        alert(666)
      }}
    />
  )
}
