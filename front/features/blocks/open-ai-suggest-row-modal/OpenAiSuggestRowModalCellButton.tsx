import { aiSuggestRowSlice } from '@front/entities/ai/aiSuggestRowSlice'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { Box, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { LuSparkles } from 'react-icons/lu'

export const OpenAiSuggestRowModalCellButton = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='top' title='AI suggestion'>
      <Box
        onClick={() => {
          reduxHolder.dispatch(
            aiSuggestRowSlice.actions.open({ blockIndex: block.index, rowIndex: row.index }),
          )
        }}
        sx={{
          alignItems: 'center',
          borderRadius: 4,
          color: '#aaa',
          cursor: 'pointer',
          display: 'flex',
          height: 24,
          justifyContent: 'center',
          userSelect: 'none',
          width: 24,
          ':hover': { color: 'black' },
        }}
      >
        <LuSparkles size={14} />
      </Box>
    </Tooltip>
  )
}
