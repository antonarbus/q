import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { getTextWithBoldSubStringAsJsx } from '@front/shared/util/getTextWithBoldSubStringAsJsx'
import { PiBooks } from 'react-icons/pi'

type Props = {
  inputValue: string
  option: ResBody['bookmarkList'][number]
}

export const OptionItemName = (props: Props): React.JSX.Element => {
  return (
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
      {props.inputValue === ''
        ? props.option.name
        : getTextWithBoldSubStringAsJsx({
            text: props.option.name,
            subString: props.inputValue,
          })}
    </Box>
  )
}
