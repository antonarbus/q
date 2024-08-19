import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { Box } from '@mui/material'
import type { HTMLAttributes } from 'react'
import type { Item } from '@entities/quotation'
import { PiBooks } from 'react-icons/pi'
import { RotatingLoaderIcon } from '@shared/components'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'

type Props = {
  loadBookmark: ({ id }: { id: string }) => void
  inputValueSignal: { value: string }
  isPendingBookmark: boolean
  pendingBookmarkId: string
}

export const renderOption = ({
  loadBookmark,
  inputValueSignal,
  isPendingBookmark,
  pendingBookmarkId,
}: Props) =>
  function render(
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
  ): JSX.Element {
    const getHighlightedDescription = (): string | (string | JSX.Element)[] => {
      if (inputValueSignal.value) {
        const boldSubString = getJsxWithBoldSubstr({
          text: option.desc ?? '',
          boldText: inputValueSignal.value,
        })

        return boldSubString
      }

      if (option.desc === undefined) return '-'
      if (option.desc) return option.desc
      return '-'
    }

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
          ...(!isPendingBookmark && {
            ':hover::after': {
              content: '"Click to copy"',
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(3px)',
            },
          }),
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
          <span
            css={{
              color: 'grey',
              marginRight: '5px',
            }}
          >
            <PiBooks
              style={{
                height: '16px',
                width: '16px',
                translate: '0px 4px',
              }}
            />{' '}
            <span
              css={{
                fontSize: '12px',
              }}
            >
              name:
            </span>
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
          <span
            css={{
              color: 'grey',
              marginRight: '5px',
            }}
          >
            <BsTags
              style={{
                height: '16px',
                width: '16px',
                translate: '0px 4px',
              }}
            />{' '}
            <span
              css={{
                fontSize: '12px',
              }}
            >
              category:
            </span>
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
          <span
            css={{
              color: 'grey',
              marginRight: '5px',
            }}
          >
            <BsFileEarmarkText
              style={{
                height: '16px',
                width: '16px',
                translate: '0px 3px',
              }}
            />{' '}
            <span
              css={{
                fontSize: '12px',
              }}
            >
              description:
            </span>
          </span>
          {getHighlightedDescription()}
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
