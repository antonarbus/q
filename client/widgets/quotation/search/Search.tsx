import { dispatch } from '@lib_instances/store'
import { Autocomplete, Box, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { type HTMLAttributes, useCallback } from 'react'
import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import { PiBooks } from 'react-icons/pi'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { copySlice } from '@entities/copy'
import { useGetItemMutation, useGetItemsQuery } from '@entities/item'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { cls } from '@shared/consts/cls'
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
      className={cls.search}
      freeSolo
      disablePortal
      clearOnBlur
      // open // manual open control
      clearOnEscape
      loading={isPendingItems}
      options={options}
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
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name='category'
            variant='standard'
            placeholder='Search'
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
              '.MuiInput-root': {
                padding: '4px 30px 0px 0px !important',
              },
              input: {
                textAlign: 'center',
              },
            }}
          />
        )
      }}
      renderOption={(props, option, { selected, index, inputValue }) => {
        return (
          <li
            // {...props}
            onClick={() => {
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
      PaperComponent={useCallback((props: HTMLAttributes<HTMLElement>) => {
        // without useCallback() the component will rerender and loose scroll position
        return (
          <Paper
            elevation={8}
            sx={{
              width: '300px',
              translate: '0px 10px',
              borderRadius: '8px',
              padding: '30px 8px 8px 8px',
              // height: '600px',
              '.MuiAutocomplete-listbox': {
                maxHeight: '310px',
              },
            }}
            {...props}
          >
            {props.children}
            <Box
              sx={{
                fontSize: '14px',
                color: 'grey',
                fontWeight: 500,
                position: 'absolute',
                top: '6px',
                left: '50%',
                translate: '-50% 0',
              }}
            >
              Your items
            </Box>
            <IconButton
              size='small'
              sx={{
                position: 'absolute',
                top: '5px',
                right: '5px',
              }}
            >
              <IoClose />
            </IconButton>
          </Paper>
        )
      }, [])}
      componentsProps={{
        paper: {
          className: cls.searchAutocomplete,
          elevation: 10,
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
