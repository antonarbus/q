/* eslint-disable @typescript-eslint/strict-void-return */
import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { useSelector } from '@shared/lib/redux'
import { useCopyBookmarkAtSearch } from '@feature/bookmark/copy-bookmark/useCopyBookmarkAtSearch'
import { OptionItemCategory } from './OptionItemCategory'
import { OptionItemDescription } from './OptionItemDescription'
import { OptionItemName } from './OptionItemName'

type Props = {
  inputValue: string
  option: ResBody['bookmarkList'][number]
}

export const SearchOption = (props: Props): React.JSX.Element => {
  const copyBookmarkAtSearch = useCopyBookmarkAtSearch()

  const isPreviewPreparing = useSelector(
    (state) => state.copy.isPreviewPreparing,
  )

  const isLoading =
    copyBookmarkAtSearch.isPending === true || isPreviewPreparing === true

  const isThisOptionLoading =
    isLoading === true && props.option.id === copyBookmarkAtSearch.bookmarkId

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
        ...(isLoading === false && {
          ':hover::after': {
            content: '"Click to copy"',
            position: 'absolute',
            fontSize: '10px',
            top: '2px',
            right: '5px',
          },
        }),
      }}
      onClick={async (event: React.MouseEvent): Promise<void> => {
        await copyBookmarkAtSearch.mutateAsync({
          bookmarkId: props.option.id,
          cursorPos: {
            x: event.clientX,
            y: event.clientY,
          },
        })
      }}
    >
      <OptionItemName inputValue={props.inputValue} option={props.option} />
      <OptionItemCategory inputValue={props.inputValue} option={props.option} />
      <OptionItemDescription
        inputValue={props.inputValue}
        option={props.option}
      />
      {isThisOptionLoading === true ? (
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
