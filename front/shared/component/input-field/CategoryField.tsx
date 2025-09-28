import {
  type TextFieldProps,
  Autocomplete,
  InputAdornment,
  TextField,
} from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsTags } from 'react-icons/bs'
import type { JSX } from 'react'

type Props = {
  categorySignal: Signal<string | undefined>
  options: string[]
} & TextFieldProps

export const CategoryField = ({
  categorySignal,
  options,
  ...rest
}: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        inputValue={categorySignal.value}
        onInputChange={(event, newInputValue) => {
          categorySignal.value = newInputValue
        }}
        options={options}
        renderInput={(params) => {
          const { InputProps, ...otherParams } = params

          return (
            <TextField
              {...otherParams}
              label='Category'
              name='category'
              placeholder='Category'
              {...rest}
              slotProps={{
                input: {
                  ...InputProps,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BsTags
                        style={{
                          height: '18px',
                          width: '18px',
                          translate: '5px',
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '.MuiInputBase-root': {
                  pl: '14px',
                  background: 'white',
                },
              }}
            />
          )
        }}
        renderOption={(props, option, { selected, index, inputValue }) => {
          return (
            <li
              {...props}
              css={{
                borderRadius: '6px',
                paddingBlock: '10px !important',
                margin: '2px 4px',
                '&:hover': {
                  background: '#dfdfdf !important',
                },
              }}
              key={option}
            >
              {option}
            </li>
          )
        }}
        slotProps={{
          paper: {
            elevation: 10,
            sx: {
              translate: '0px 10px',
              borderRadius: '8px',
              padding: '0px 8px',
            },
          },
        }}
      />
    </div>
  )
}
