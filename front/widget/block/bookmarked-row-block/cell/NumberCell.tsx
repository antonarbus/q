import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const NumberCell = (): JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: 'number',
    minWidth: columnMinWidth.number,
  })

  return (
    <Box
      className='td number'
      style={{
        ...stylesForResizableCell,
        fontSize: '10px',
        color: 'grey',
        paddingBottom: '4px',
        top: '5px',
      }}
    >
      1.1
    </Box>
  )
}
