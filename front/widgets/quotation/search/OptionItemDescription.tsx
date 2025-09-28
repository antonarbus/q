import { BsFileEarmarkText } from 'react-icons/bs'
import { Box } from '@mui/material'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { useCallback, type JSX, type ReactNode } from 'react'

type Props = {
  inputValueSignal: { value: string }
  option: ItemPick
}

export const OptionItemDescription = (props: Props): JSX.Element => {
  const getHighlightedDescription = useCallback((): ReactNode => {
    if (props.inputValueSignal.value !== '') {
      const boldSubString = getTextWithBoldSubStringAsJsx({
        text: props.option.desc ?? '',
        subString: props.inputValueSignal.value,
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
  }, [props.inputValueSignal.value, props.option.desc])

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
