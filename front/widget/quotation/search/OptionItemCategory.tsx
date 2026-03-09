import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'
import { BsTags } from 'react-icons/bs'

type Props = {
  inputValue: string
  option: ResBody['bookmarkList'][number]
}

export const OptionItemCategory = (props: Props): React.JSX.Element => {
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
      {props.inputValue === ''
        ? props.option.category
        : getTextWithBoldSubStringAsJsx({
            text: props.option.category,
            subString: props.inputValue,
          })}
    </Box>
  )
}
