import { BsFileEarmarkText } from 'react-icons/bs'
import { Box } from '@mui/material'
import { getJsxWithBoldSubstr } from '@shared/util/getJsxWithBoldSubstr'
import type { ItemPick } from '@back/api/bookmark/getBookmarksHandler'

type Props = {
  inputValueSignal: { value: string }
  option: ItemPick
}

export const OptionItemDescription = (props: Props): React.JSX.Element => {
  const getHighlightedDescription = ():
    | string
    | (string | React.JSX.Element)[] => {
    if (props.inputValueSignal.value !== '') {
      const boldSubString = getJsxWithBoldSubstr({
        text: props.option.desc ?? '',
        boldText: props.inputValueSignal.value,
      })

      return boldSubString
    }

    if (props.option.desc === undefined) {
      return '-'
    }

    if (props.option.desc !== '') {
      return props.option.desc
    }

    return '-'
  }

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
  )
}
