import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { type Signal } from '@preact/signals-react'
import { BsTags } from 'react-icons/bs'
import { useGetItemsQuery } from '@entities/item'

type Props = {
  categorySignal: Signal<string>
}

export const CategoryInput = ({ categorySignal }: Props): JSX.Element => {
  const { data: itemsRes } = useGetItemsQuery()

  const categories = ((itemsRes?.documents ?? [])
    .map(item => item.category)
    .filter(category => Boolean(category)) as string[])
    .sort((a: string, b: string) => a.localeCompare(b))

  const uniqueCategories = [...new Set(categories)]

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        freeSolo
        options={uniqueCategories}
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
