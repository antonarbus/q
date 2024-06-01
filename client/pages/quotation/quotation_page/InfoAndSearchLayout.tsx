import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const InfoAndSearchLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: '5px',
        marginBottom: '20px',
      }}
    >
      {children}
    </Box>
  )
}
