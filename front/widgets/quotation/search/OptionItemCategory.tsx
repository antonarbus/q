import { BsTags } from 'react-icons/bs'
import { Box } from '@mui/material'
import { getJsxWithBoldSubstr } from '@shared/util/getJsxWithBoldSubstr'
import type { ItemPick } from '@back/api/bookmark/getBookmarksHandler'

type Props = {
  inputValueSignal: { value: string }
  option: ItemPick
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
      {props.inputValueSignal.value === ''
        ? (props.option.category ?? '')
        : getJsxWithBoldSubstr({
            text: props.option.category ?? '',
            boldText: props.inputValueSignal.value,
          })}
    </Box>
  )
}
