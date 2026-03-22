import { Box, IconButton, Paper } from '@mui/material'
import { cls } from '@front/shared/cls'
import { IoClose } from 'react-icons/io5'

export const PaperComponent = (
  props: React.HTMLAttributes<HTMLElement>,
): React.JSX.Element => {
  return (
    <Paper
      className={cls.searchAutocomplete}
      elevation={8}
      sx={{
        width: '300px',
        translate: '0px 10px',
        padding: '30px 6px 8px 6px',
        '.MuiAutocomplete-listbox': {
          maxHeight: '315px',
          pt: '0px !important',
        },

        // liquid glass
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }}
      {...props}
    >
      {props.children}
      <Box
        sx={{
          fontSize: '14px',
          color: 'grey',
          fontWeight: 500,
          position: 'absolute',
          top: '6px',
          left: '50%',
          translate: '-50% 0',
        }}
      >
        Bookmarks
      </Box>
      <IconButton
        size='small'
        sx={{
          position: 'absolute',
          top: '2px',
          right: '5px',
        }}
      >
        <IoClose />
      </IconButton>
    </Paper>
  )
}
