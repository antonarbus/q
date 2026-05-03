import { InputAdornment, TextField } from '@mui/material'
import type { AutocompleteRenderInputParams } from '@mui/material'
import { GoSearch } from 'react-icons/go'

export const renderInput = (params: AutocompleteRenderInputParams): React.JSX.Element => {
  return (
    <TextField
      {...params}
      name='category'
      placeholder='Insert from bookmarks...'
      slotProps={{
        ...params.slotProps,
        input: {
          ...params.slotProps.input,
          startAdornment: (
            <InputAdornment position='start'>
              <GoSearch />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '.MuiInputBase-root': {
          padding: '0px 5px !important',
          flexWrap: 'nowrap',
        },
        '.MuiInput-root': {
          padding: '4px 30px 0px 0px !important',
        },
        input: {
          textAlign: 'center',
        },
      }}
      variant='standard'
    />
  )
}
