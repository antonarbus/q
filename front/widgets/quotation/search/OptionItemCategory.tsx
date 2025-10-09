import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { Box } from '@mui/material'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'
import type { JSX } from 'react'
import { BsTags } from 'react-icons/bs'

type Props = {
  inputValueSignal: { value: string }
  option: ItemPick
}

export const OptionItemCategory = (props: Props): JSX.Element => {
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
      {props.inputValueSignal.value === ''
        ? (props.option.category ?? '')
        : getTextWithBoldSubStringAsJsx({
            text: props.option.category ?? '',
            subString: props.inputValueSignal.value,
          })}
    </Box>
  )
}
