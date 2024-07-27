import { Box } from '@mui/material'
import { boqColumnKey, useStylesForResizableCell } from '@entities/quotation'

export const NumberCell = (): JSX.Element => {
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: boqColumnKey.number,
    minWidth: '30px',
  })

  return (
    <Box
      className={'td number'}
      style={{
        ...stylesForResizableCell,
        fontSize: '10px',
        color: 'grey',
        paddingBottom: '2px',
        top: '5px',
      }}
    >
      1.1
    </Box>
  )
}
