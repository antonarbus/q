import { Box } from '@mui/material'
import { getState } from 'client/shared/clients'
import { BoqRows } from './boq_rows/BoqRows'
import { BoqColsHeader } from './boq_cols_header'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element | null => {
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Box
      className='boq-table-container-with-paddings'
      sx={{ p: '10px' }}
    >
      <Box
        className='boq-table-container'
        sx={{
          overflow: 'auto',
          '& *': {
            background: '#ff00001b',
            // border: '1px dotted grey',
          },
        }}
      >
        <BoqColsHeader index={index} />
        <BoqRows index={index} />
      </Box>
    </Box>
  )
}
