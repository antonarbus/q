import { Box } from '@mui/material'
import { type HTMLAttributes } from 'react'
import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { PiBooks } from 'react-icons/pi'
import { type Item } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'

type Props = {
  loadBookmark: ({ id }: { id: string }) => void
  inputValueSignal: { value: string }
  isPendingBookmark: boolean
  pendingBookmarkId: string
}

export const renderOption =
  ({
    loadBookmark,
    inputValueSignal,
    isPendingBookmark,
    pendingBookmarkId,
  }: Props) =>
  (
    props: HTMLAttributes<HTMLLIElement>,
    option: Item,
    {
      selected,
      index,
      inputValue,
    }: {
      selected: boolean
      index: number
      inputValue: string
    },
  ): JSX.Element => {
    return (
      <li
        // {...props}
        onClick={() => {
          loadBookmark({ id: option.id })
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
          border: '1px solid #ccc',
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
            <PiBooks
              style={{ height: '16px', width: '16px', translate: '0px 3px' }}
            />{' '}
            <span css={{ fontSize: '12px' }}>name:</span>
          </span>
          {inputValueSignal.value
            ? getJsxWithBoldSubstr({
                text: option.name ?? '',
                boldText: inputValueSignal.value,
              })
            : option.name}
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
            <BsTags
              style={{ height: '16px', width: '16px', translate: '0px 3px' }}
            />{' '}
            <span css={{ fontSize: '12px' }}>category:</span>
          </span>
          {inputValueSignal.value
            ? getJsxWithBoldSubstr({
                text: option.category ?? '',
                boldText: inputValueSignal.value,
              })
            : option.category ?? ''}
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
            <BsFileEarmarkText
              style={{ height: '16px', width: '16px', translate: '0px 2px' }}
            />{' '}
            <span css={{ fontSize: '12px' }}>description:</span>
          </span>
          {inputValueSignal.value
            ? getJsxWithBoldSubstr({
                text: option.desc ?? '',
                boldText: inputValueSignal.value,
              })
            : option.desc
              ? option.desc
              : '-'}
        </Box>
        {isPendingBookmark && option.id === pendingBookmarkId && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(3px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RotatingLoaderIcon />
          </Box>
        )}
      </li>
    )
  }
