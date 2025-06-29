import { Box, IconButton, Paper } from '@mui/material'
import type { HTMLAttributes } from 'react'
import { IoClose } from 'react-icons/io5'
import { cls } from '@shared/const/cls'

export const PaperComponent = (
  props: HTMLAttributes<HTMLElement>,
): React.JSX.Element => {
  return (
    <Paper
      className={cls.searchAutocomplete}
      elevation={8}
      sx={{
        width: '300px',
        translate: '0px 10px',
        borderRadius: '8px',
        padding: '30px 6px 8px 6px',
        '.MuiAutocomplete-listbox': {
          maxHeight: '315px',
          pt: '0px !important',
        },
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
