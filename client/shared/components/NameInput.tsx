import { InputAdornment, TextField } from '@mui/material'
import { FaBook } from 'react-icons/fa'

export const NameInput = (): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        disabled={false}
        fullWidth
        placeholder='Item name'
        label='Item name'
        autoFocus
        // value={emailSignal.value}
        // onChange={(e): void => {
        //   emailSignal.value = e.target.value
        // }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FaBook style={{ translate: '-4px' }}/>
            </InputAdornment>
          ),
        }}
        inputProps={{
          autoComplete: 'off',
        }}
        sx={{
          mb: 2,
          '.MuiInputBase-root': {
            pl: '21px !important',
          },
        }}
      />
    </div>
  )
}
