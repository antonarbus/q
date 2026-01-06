import type { CellKey } from '@back/entities/quotation/schemas'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { selectCellPin } from '@entities/quotation/redux/selector/selectCellPin'
import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import { useSelector } from '@shared/lib/redux'
import type { MouseEvent, ReactNode } from 'react'
import { VscPinned } from 'react-icons/vsc'

type Props = {
  cellKey: CellKey
  onClick: (e: MouseEvent) => void
}

export const Pin = (props: Props): ReactNode => {
  const block = useBlock()
  const row = useRow()

  const pin = useSelector(
    selectCellPin({
      blockIndex: block.index,
      rowIndex: row.index,
      cellKey: props.cellKey,
    }),
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
      component='button' // to make it focusable to understand if we click within same row on pins and not hide them at Row onBlur callback // https://stackoverflow.com/a/42764495/7239778
      // use onMouseDown instead of click because in Safari it does not work for some reason
      onMouseDown={(event): void => {
        props.onClick(event)
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
