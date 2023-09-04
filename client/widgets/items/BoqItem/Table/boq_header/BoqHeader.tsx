import { Box } from '@mui/material'
import { NumberHeader } from './NumberHeader'
import { DescriptionHeader } from './DescriptionHeader'
import { ItemHeader } from './ItemHeader'
import { QtyHeader } from './QtyHeader'
import { PriceHeader } from './PriceHeader'

interface Props {
  index: number
}

export const BoqHeader = ({ index }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      sx={{
        display: 'flex',
        minHeight: '40px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      <NumberHeader index={index} />
      <DescriptionHeader index={index} />
      <ItemHeader index={index} />
      <QtyHeader index={index} />
      <PriceHeader index={index} />
    </Box>
  )
}
