import { BsFileEarmarkText, BsTags } from 'react-icons/bs'
import { Box } from '@mui/material'
import type { HTMLAttributes } from 'react'
import { PiBooks } from 'react-icons/pi'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { getJsxWithBoldSubstr } from '@shared/utils/getJsxWithBoldSubstr'
import type { Signal } from '@preact/signals-react'
import type { LoadBookmark } from '@features/bookmark/copy_bookmark'
import type { ItemPick } from '@back/api/bookmark/getBookmarks'

type Props = {
  loadBookmark: LoadBookmark
  inputValueSignal: { value: string }
  isPendingBookmark: boolean
  pendingBookmarkId: string
  isAutocompleteOpen: Signal<boolean>
}

export const renderOption = ({
  loadBookmark,
  inputValueSignal,
  isPendingBookmark,
  pendingBookmarkId,
  isAutocompleteOpen,
}: Props) =>
  function render(
    props: HTMLAttributes<HTMLLIElement>,
    option: ItemPick,
    {
      selected,
      index,
      inputValue,
    }: {
      selected: boolean
      index: number
      inputValue: string
    },
  ): React.JSX.Element {
    const getHighlightedDescription = ():
      | string
      | (string | React.JSX.Element)[] => {
      if (inputValueSignal.value) {
        const boldSubString = getJsxWithBoldSubstr({
          text: option.desc ?? '',
          boldText: inputValueSignal.value,
        })

        return boldSubString
      }

      if (option.desc === undefined) {
        return '-'
      }

      if (option.desc) {
        return option.desc
      }

      return '-'
    }

    return (
      <li
        // {...props}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await loadBookmark({ id: option.id })
          isAutocompleteOpen.value = false
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
          ':hover': {
            background: 'rgba(0, 0, 0, 0.05)',
          },
          ...(!isPendingBookmark && {
            ':hover::after': {
              content: '"Click to copy"',
              position: 'absolute',
              fontSize: '10px',
              top: '2px',
              right: '5px',
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
            : (option.category ?? '')}
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
