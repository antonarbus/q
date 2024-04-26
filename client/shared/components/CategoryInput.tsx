import { theme } from '@lib_instances/theme'
import { Person } from '@mui/icons-material'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { useSignal, type Signal, useSignalEffect } from '@preact/signals-react'
import mailcheck from 'mailcheck'
import type { RefObject } from 'react'
import { MdCategory } from 'react-icons/md'

// type Props = {
//   emailSignal: Signal<string>
//   isEmailOkSignal: Signal<boolean>
//   inputRef?: RefObject<HTMLDivElement>
//   disabled?: boolean
// }

export const CategoryInput = (): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        options={['a', 'b', 'c']}
        renderOption={(props, option, { selected, index, inputValue }) => {
          return (
            <li
              {...props}
              // key={hash(option)}
              css={{
                borderRadius: '6px',
                paddingBlock: '10px !important',
                margin: '2px 4px',
                '&:hover': {
                  background: '#dfdfdf !important',
                },
              }}
            >
              {option}
            </li>
          )
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label='Category'
              placeholder='Category'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <MdCategory style={{ height: '22px', width: '22px', translate: '5px' }}/>
                  </InputAdornment>
                ),
              }}
              sx={{
                '.MuiInputBase-root': {
                  pl: '10px',
                },
              }}
            />
          )
        }}
        componentsProps={{
          paper: {
            elevation: 10,
            sx: {
              translate: '0px 10px',
              borderRadius: '8px',
              padding: '2px 8px',
            },
          },
        }}
        sx={{
          mb: 2,
        }}
      />
    </div>
  )
}
