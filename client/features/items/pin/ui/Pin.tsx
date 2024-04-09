import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { VscPinned } from 'react-icons/vsc'
import { type BoqRowCellKey, selectBoqCellPin, useItem, useRow } from '@entities/quotation'
import { className } from '@shared/consts/className'

type Props = {
  boqRowCellKey: BoqRowCellKey
  onClick: () => void
}

export const Pin = ({
  boqRowCellKey,
  onClick,
}: Props): ReactNode => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const pin = useSelectorTyped(selectBoqCellPin({ itemIndex, rowIndex, boqRowCellKey }))

  if (pin === undefined) return null
  if (!pin.isShown) return null

  return (
    <Box
      className={className.pin}
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
        className={className.pin + ' svg'}
        style={{
          rotate: '35deg',
          fill: pin.isPinned ? 'black' : '#b8b8b8',
          strokeWidth: pin.isPinned ? '0.2px' : '0px',
        }}
      />
    </Box>
  )
}
