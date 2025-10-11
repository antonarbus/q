import { selectBoqCellPin, useBlock, useRow } from '@entities/quotation'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import { useSelector } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { VscPinned } from 'react-icons/vsc'

type Props = {
  boqRowCellKey: BoqRowCellKey
  onClick: (e: MouseEvent) => void
}

export const Pin = ({ boqRowCellKey, onClick }: Props): ReactNode => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  const pin = useSelector(
    selectBoqCellPin({ blockIndex, rowIndex, boqRowCellKey }),
  )

  if (pin === undefined) {
    return null
  }

  if (pin.isShown === false) {
    return null
  }

  return (
    <Box
      className={cls.pin}
      component='button' // to make it focusable to understand if we click within same row on pins and not hide them at BoqRow onBlur callback // https://stackoverflow.com/a/42764495/7239778
      // use onMouseDown instead of click because in Safari it does not work for some reason
      onMouseDown={(event): void => {
        onClick(event)
      }}
      sx={{
        all: 'unset',
        position: 'absolute',
        cursor: 'pointer',
        top: 10,
        right: 0,
        zIndex: 1,
      }}
      type='button'
    >
      <VscPinned
        className={`${cls.pin} svg`}
        style={{
          rotate: '35deg',
          fill: pin.isPinned ? 'black' : '#b8b8b8',
          strokeWidth: pin.isPinned ? '0.2px' : '0px',
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
