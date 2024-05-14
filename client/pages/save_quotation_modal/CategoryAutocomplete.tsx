import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { BsTags } from 'react-icons/bs'
import { useGetQuotationCategoriesQuery } from '@entities/quotation'

type Props = {
  categorySignal: Signal<string>
}

export const CategoryAutocomplete = ({ categorySignal }: Props): JSX.Element => {
  const { data } = useGetQuotationCategoriesQuery()

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        options={data?.categories ?? []}
        inputValue={categorySignal.value}
        onInputChange={(event, newInputValue) => {
          categorySignal.value = newInputValue
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
              label='Category'
              placeholder='Category'
              // required
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <BsTags style={{ height: '18px', width: '18px', translate: '5px' }}/>
                  </InputAdornment>
                ),
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
      />
    </div>
  )
}
