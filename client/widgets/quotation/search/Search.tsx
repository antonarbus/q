import { dispatch } from '@lib_instances/store'
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { PiBooks } from 'react-icons/pi'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { copySlice } from '@entities/copy'
import { useGetItemMutation, useGetItemsQuery } from '@entities/item'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { className } from '@shared/consts/className'
import { notify } from '@shared/ui/top_msg'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'

export const Search = (): JSX.Element => {
  const { data: itemsData, isPending: isPendingItems, refetch } = useGetItemsQuery()
  const { mutate: loadItem, isPending: isPendingGetItem, isSuccess, isError, error, data: itemData, variables } = useGetItemMutation()
  const options = itemsData?.documents ?? []
  const inputValueSignal = useSignal('')

  useEffectOnce(() => {
    void refetch()
  })

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = itemData

      if (!item) return

      isFroalaSignal.value = false

      dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyContainer())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'light' })
    }
  }, [isError])

  return (
    <Autocomplete
      className={className.search}
      freeSolo={options.length !== 0} // otherwise noOptionsText will not be shown
      disablePortal
      clearOnBlur
      clearOnEscape
      fullWidth
      loading={isPendingItems}
      noOptionsText='No saved items found'
      options={options}
      popupIcon={null}
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
        zIndex: 0,
        translate: '0px 5px',
      }}
      renderOption={(props, option, { selected, index, inputValue }) => {
        return (
          <li
            // {...props}
            onClick={() => {
              // console.log('option:', option)
              loadItem({ id: option.id })
            }}
            key={option.id}
            css={{
              position: 'relative',
              cursor: 'pointer',
              display: 'block',
              borderRadius: '6px',
              padding: '5px !important',
              margin: '2px 4px',
              fontSize: '14px',
              '&:hover': {
                background: '#dfdfdf !important',
              },
            }}
          >
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <PiBooks style={{ height: '16px', width: '16px', translate: '0px 3px' }} /> <span css={{ fontSize: '12px' }}>name:</span>
              </span>
              {inputValueSignal.value
                ? getJsxWithBoldSubstr({ text: option.name, boldText: inputValueSignal.value })
                : option.name
              }
            </Box>
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <BsTags style={{ height: '16px', width: '16px', translate: '0px 3px' }} /> <span css={{ fontSize: '12px' }}>category:</span>
              </span>
              {inputValueSignal.value
                ? getJsxWithBoldSubstr({ text: option.category ?? '', boldText: inputValueSignal.value })
                : option.category ?? ''
              }
            </Box>
            <Box
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <span css={{ color: 'grey', marginRight: '5px' }}>
                <BsFileEarmarkText style={{ height: '16px', width: '16px', translate: '0px 2px' }} /> <span css={{ fontSize: '12px' }}>description:</span>
              </span>
              {inputValueSignal.value
                ? getJsxWithBoldSubstr({ text: option.desc ?? '', boldText: inputValueSignal.value })
                : option.desc ? option.desc : '-'
              }
            </Box>
            {isPendingGetItem && option.id === variables.id && (
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <RotatingLoaderIcon />
              </Box>
            )}
          </li>
        )
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name='category'
            variant='standard'
            placeholder='Search in your items'
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='start'>
                  <GoSearch/>
                </InputAdornment>
              ),
            }}
            sx={{
              '.MuiInputBase-root': {
                padding: '0px 5px !important',
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
          className: className.searchAutocomplete,
          elevation: 10,
          sx: {
            width: '300px',
            translate: '0px 10px',
            borderRadius: '8px',
            padding: '2px 8px',
          },
        },
        popper: {
          sx: {
            zIndex: 3,
          },
        },
      }}
    />
  )
}
