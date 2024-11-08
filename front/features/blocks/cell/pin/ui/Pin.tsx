import { useSelector } from '@shared/lib/redux'
import { Box } from '@mui/material'
import { VscPinned } from 'react-icons/vsc'
import { selectBoqCellPin, useBlock, useRow } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'

type Props = {
  boqRowCellKey: BoqRowCellKey
  onClick: (e: React.MouseEvent) => void
}

export const Pin = ({ boqRowCellKey, onClick }: Props): React.ReactNode => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  const pin = useSelector(
    selectBoqCellPin({ blockIndex, rowIndex, boqRowCellKey }),
  )

  if (pin === undefined) return null
  if (!pin.isShown) return null

  return (
    <Box
      className={cls.pin}
      component='button' // to make it focusable to understand if we click within same row on pins and not hide them at BoqRow onBlur callback // https://stackoverflow.com/a/42764495/7239778
      onClick={onClick}
      sx={{
        all: 'unset',
        position: 'absolute',
        cursor: 'pointer',
        top: 10,
        right: 0,
        zIndex: 1,
      }}
    >
      <VscPinned
        className={`${cls.pin} svg`}
        style={{
          rotate: '35deg',
          fill: pin.isPinned ? 'black' : '#b8b8b8',
          strokeWidth: pin.isPinned ? '0.2px' : '0px',
        }}
      />
    </Box>
  )
}
