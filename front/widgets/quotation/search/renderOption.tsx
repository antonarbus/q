import { Box } from '@mui/material'
import type { HTMLAttributes, JSX } from 'react'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import type { Signal } from '@preact/signals-react'
import type { LoadBookmark } from '@features/bookmark/copy-bookmark'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { OptionItemName } from './OptionItemName'
import { OptionItemCategory } from './OptionItemCategory'
import { OptionItemDescription } from './OptionItemDescription'

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
  ): JSX.Element {
    return (
      <li
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
          ...(isPendingBookmark === false && {
            ':hover::after': {
              content: '"Click to copy"',
              position: 'absolute',
              fontSize: '10px',
              top: '2px',
              right: '5px',
            },
          }),
        }}
        key={option.id}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await loadBookmark({ id: option.id })
          isAutocompleteOpen.value = false
        }}
      >
        <OptionItemName
          inputValueSignal={inputValueSignal}
          option={option}
        />

        <OptionItemCategory
          inputValueSignal={inputValueSignal}
          option={option}
        />

        <OptionItemDescription
          inputValueSignal={inputValueSignal}
          option={option}
        />

        {isPendingBookmark && option.id === pendingBookmarkId ? (
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
        ) : null}
      </li>
    )
  }
