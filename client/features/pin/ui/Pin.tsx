import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { VscPinned } from 'react-icons/vsc'
import { selectBoqCellPin, useItem, useRow } from '@entities/items'
import { className } from '@shared/consts/className'
import { type BoqColumnKey } from '@shared/types'

type Props = {
  boqColumnKey: BoqColumnKey
  onClick: () => void
}

export const Pin = ({
  boqColumnKey,
  onClick,
}: Props): ReactNode => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const pin = useSelectorTyped(selectBoqCellPin({ itemIndex, rowIndex, boqColumnKey }))

  if (pin === undefined) return null
  if (!pin.isShown) return null

  return (
    <Box
      className={className.pin}
      component='button' // to make it focusable to understand if we click within same row on pins and not hide them at BoqRow onBlur callback // https://stackoverflow.com/a/42764495/7239778
      sx={{
        all: 'unset',
        position: 'absolute',
        top: '-5px',
        right: 0,
      }}
    >
      <VscPinned
        className={className.pin + ' svg'}
        css={{
          rotate: '35deg',
          fill: pin.isPinned ? 'black' : '#b8b8b8',
          strokeWidth: pin.isPinned ? '0.2px' : '0px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
    </Box>
  )
}
