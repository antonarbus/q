import { dispatch } from '@lib_instances/store'
import { Autocomplete, Box, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { PiBooks } from 'react-icons/pi'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { copySlice } from '@entities/copy'
import { useGetItemMutation, useGetItemsQuery } from '@entities/item'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'

export const Search = (): JSX.Element => {
  const { data: itemsData, isPending: isPendingItems, refetch } = useGetItemsQuery()
  const { mutate: loadItem, isPending, isSuccess, isError, error, data: itemData, variables } = useGetItemMutation()

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
      freeSolo
      disablePortal
      clearOnBlur
      clearOnEscape
      fullWidth
      loading={isPendingItems}
      // options={[]}
      options={itemsData?.documents ?? []}
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
            {isPending && option.id === variables.id && (
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.1)',
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
            zIndex: 3,
          },
        },
      }}
    />
  )
}
