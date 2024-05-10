import { Autocomplete, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { PiBooks } from 'react-icons/pi'
import { useEffectOnce } from 'react-use'
import { useGetItemsQuery } from '@entities/item'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'

export const Search = (): JSX.Element => {
  const { data, refetch } = useGetItemsQuery()
  const inputValueSignal = useSignal('')

  useEffectOnce(() => {
    void refetch()
  })

  return (
    <Autocomplete
      freeSolo
      disablePortal
      clearOnBlur
      clearOnEscape
      fullWidth
      options={data?.documents ?? []}
      inputValue={inputValueSignal.value}
      onInputChange={(event, newInputValue) => {
        inputValueSignal.value = newInputValue
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        return option.name + option.category + option.desc
      }}
      sx={{
        position: 'relative',
        width: '300px',
        // transition: 'width 0.3s',
        // ':has(input:focus)': {
        //   width: '300px',
        // },
        zIndex: 0,
      }}
      renderOption={(props, option, { selected, index, inputValue }) => {
        return (
          <li
            // {...props}
            onClick={() => {
              console.log('option:', option)
            }}
            key={option.id}
            css={{
              cursor: 'pointer',
              display: 'block',
              borderRadius: '6px',
              padding: '5px !important',
              margin: '2px 4px',
              '&:hover': {
                background: '#dfdfdf !important',
              },
            }}
          >
            <div
              css={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <PiBooks style={{ height: '16px', width: '16px', translate: '0px 3px' }} />
              </span>
              {inputValueSignal.value
                ? <span>{getJsxWithBoldSubstr({ text: option.name, boldText: inputValueSignal.value })}</span>
                : option.name
              }
            </div>
            <div
              css={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <BsTags style={{ height: '16px', width: '16px', translate: '0px 3px' }} />
              </span>
              {inputValueSignal.value
                ? <span>{getJsxWithBoldSubstr({ text: option.category ?? '', boldText: inputValueSignal.value })}</span>
                : option.category ?? ''
              }
            </div>
            <div
              css={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <BsFileEarmarkText style={{ height: '16px', width: '16px', translate: '0px 2px' }} />
              </span>
              {inputValueSignal.value
                ? <span>{getJsxWithBoldSubstr({ text: option.desc ?? '', boldText: inputValueSignal.value })}</span>
                : option.desc ?? ''
              }
            </div>
          </li>
        )
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name='category'
            variant='standard'
            placeholder='Search for saved items'
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
              input: {
                textAlign: 'center',
              },
            }}
          />
        )
      }}
      componentsProps={{
        paper: {
          elevation: 10,
          sx: {
            // zIndex: 0,
            // position: 'absolute',
            // right: '0px',
            width: '300px',
            translate: '0px 10px',
            borderRadius: '8px',
            padding: '2px 8px',
          },
        },
        popper: {
          sx: {
            zIndex: 2,
          },
        },
      }}
    />
  )
}
