import { Autocomplete, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useGetItemCategoriesQuery } from '@entities/item'

export const Search = (): JSX.Element => {
  const { data } = useGetItemCategoriesQuery()
  const inputValueSignal = useSignal('')

  return (
      <Autocomplete
        freeSolo
        options={data?.categories ?? []}
        inputValue={inputValueSignal.value}
        onInputChange={(event, newInputValue) => {
          inputValueSignal.value = newInputValue
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
              name='category'
              variant='standard'
              placeholder='Search for items'
              InputProps={{
                ...params.InputProps,
                // endAdornment: (
                //   <InputAdornment position='end'>
                //     <GoSearch/>
                //   </InputAdornment>
                // ),
              }}
              sx={{
                '.MuiInputBase-root': {
                  padding: '0px 5px',
                },
              }}
            />
          )
        }}
        sx={{
          width: '150px',
          transition: 'width 0.3s',
          ':has(input:focus)': {
            width: '300px',
          },
        }}
        componentsProps={{
          paper: {
            elevation: 10,
            sx: {
              position: 'absolute',
              right: '0px',
              width: '300px',
              translate: '0px 10px',
              borderRadius: '8px',
              padding: '2px 8px',
            },
          },
        }}
      />
  )
}
