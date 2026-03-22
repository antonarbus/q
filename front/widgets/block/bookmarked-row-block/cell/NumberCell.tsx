import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { Box } from '@mui/material'

export const NumberCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: 'number',
    minWidth: columnMinWidth.number,
  })

  return (
    <Box
      className='td number'
      sx={{
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
