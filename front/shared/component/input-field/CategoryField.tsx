import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import type { Signal } from '@preact/signals-react'
import { BsTags } from 'react-icons/bs'

type Props = {
  categorySignal: Signal<string | undefined>
  options: string[]
} & TextFieldProps

export const CategoryField = (props: Props): React.JSX.Element => {
  const { categorySignal, options, ...restProps } = props

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo={true}
        inputValue={categorySignal.value}
        onInputChange={(_event, newInputValue) => {
          categorySignal.value = newInputValue
        }}
        options={options}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label='Category'
              name='category'
              placeholder='Category'
              {...restProps}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
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
        renderOption={({ key, ...liRestProps }, option) => {
          return (
            <li
              key={key}
              {...liRestProps}
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
