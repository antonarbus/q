import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { PiBooks } from 'react-icons/pi'

type Props = {
  nameSignal: Signal<string>
}

export const NameInput = ({ nameSignal }: Props): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        options={['a', 'b', 'c']}
        inputValue={nameSignal.value}
        onInputChange={(event, newInputValue) => {
          nameSignal.value = newInputValue
        }}
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
              name='name'
              label='Name'
              placeholder='Name'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <PiBooks style={{ height: '22px', width: '22px', translate: '5px' }}/>
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
