import { useSelectorTyped } from 'client/shared/hooks'
import { VscPinned } from 'react-icons/vsc'
import { type BoqColumnKey } from 'client/shared/types'
import { type ReactNode } from 'react'
import { Box } from '@mui/material'
import { className } from 'client/shared/className'
import { selectBoqRowCellPin, useItem, useRow } from 'client/entities/items'

type Props = {
  boqColumnKey: BoqColumnKey
}

export const Pin = ({
  boqColumnKey,
}: Props): ReactNode => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const pin = useSelectorTyped(selectBoqRowCellPin({ itemIndex, rowIndex, boqColumnKey }))

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
        css={{
          rotate: '35deg',
          fill: pin.isPinned ? 'black' : '#b8b8b8',
          strokeWidth: pin.isPinned ? '0.2px' : '0px',
          cursor: 'pointer',
        }}
        onClick={() => {
          console.log(666)
        }}
      />
    </Box>
  )
}
