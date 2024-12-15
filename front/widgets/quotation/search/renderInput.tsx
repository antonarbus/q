import {
  type AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from '@mui/material'
import { GoSearch } from 'react-icons/go'

export const renderInput = (
  params: AutocompleteRenderInputParams,
): React.JSX.Element => {
  return (
    <TextField
      {...params}
      name='category'
      variant='standard'
      placeholder='Search in bookmarks'
      slotProps={{
        input: {
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position='start'>
              <GoSearch />
            </InputAdornment>
          ),
        },
      }}
      // InputProps={{
      //   ...params.InputProps,
      //   startAdornment: (
      //     <InputAdornment position='start'>
      //       <GoSearch />
      //     </InputAdornment>
      //   ),
      // }}
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
    />
  )
}
