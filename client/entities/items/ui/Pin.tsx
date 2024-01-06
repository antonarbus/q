import { useRow } from '../providers/RowProvider'
import { VscPinned } from 'react-icons/vsc'

export const Pin = (): JSX.Element => {
  const { rowId, rowIndex } = useRow()

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
