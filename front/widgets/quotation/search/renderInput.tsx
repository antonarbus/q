import {
  type AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from '@mui/material'
import { GoSearch } from 'react-icons/go'

export const renderInput = (
  params: AutocompleteRenderInputParams,
): React.JSX.Element => {
  const { InputProps, ...otherParams } = params
  return (
    <TextField
      {...otherParams}
      name='category'
      placeholder='Search in bookmarks'
      slotProps={{
        input: {
          ...InputProps,
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
