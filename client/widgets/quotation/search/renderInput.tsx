import {
  type AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from '@mui/material'
import { GoSearch } from 'react-icons/go'

export const renderInput = (
  params: AutocompleteRenderInputParams,
): JSX.Element => {
  return (
    <TextField
      {...params}
      name='category'
      variant='standard'
      placeholder='Search in bookmarks'
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position='start'>
            <GoSearch />
          </InputAdornment>
        ),
      }}
      sx={{
        '.MuiInputBase-root': {
          padding: '0px 5px !important',
        },
        '.MuiInput-root': {
          padding: '4px 30px 0px 0px !important',
        },
        input: {
          textAlign: 'center',
        },
      }}
    />
  )
}
