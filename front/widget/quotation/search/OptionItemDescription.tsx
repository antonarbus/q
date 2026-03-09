import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'
import { useCallback } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'

type Props = {
  inputValue: string
  option: ResBody['bookmarkList'][number]
}

export const OptionItemDescription = (props: Props): React.JSX.Element => {
  const getHighlightedDescription = useCallback((): React.ReactNode => {
    if (props.inputValue !== '') {
      const boldSubString = getTextWithBoldSubStringAsJsx({
        text: props.option.desc,
        subString: props.inputValue,
      })

      return boldSubString
    }

    if (props.option.desc === '') {
      return '-'
    }

    if (props.option.desc !== '') {
      return props.option.desc
    }

    return '-'
  }, [props.inputValue, props.option.desc])

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
