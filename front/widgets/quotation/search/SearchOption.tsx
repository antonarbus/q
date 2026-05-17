// oxlint-disable jsx-a11y/no-noninteractive-element-interactions
import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { OptionItemCategory } from './OptionItemCategory'
import { OptionItemDescription } from './OptionItemDescription'
import { OptionItemName } from './OptionItemName'

type Props = {
  liProps: React.HTMLAttributes<HTMLLIElement>
  inputValue: string
  option: ResBody['bookmarkList'][number]
  onClick: (event: React.MouseEvent) => Promise<void>
  isLoading: boolean
}

export const SearchOption = (props: Props): React.JSX.Element => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      props.onClick(event as unknown as React.MouseEvent)
    }
  }

  return (
    <li
      {...props.liProps}
      onKeyDown={handleKeyDown}
      onClick={props.onClick}
      css={{
        position: 'relative',
        cursor: 'pointer',
        display: 'block !important',
        borderRadius: '6px',
        padding: '5px !important',
        margin: '2px 4px',
        fontSize: '14px',
        border: '1px solid #ccc',
        ':hover': {
          background: 'rgba(0, 0, 0, 0.05)',
        },
        ...(props.isLoading === false && {
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
      <OptionItemName inputValue={props.inputValue} option={props.option} />
      <OptionItemCategory inputValue={props.inputValue} option={props.option} />
      <OptionItemDescription inputValue={props.inputValue} option={props.option} />
      {props.isLoading === true ? (
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
