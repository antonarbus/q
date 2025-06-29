import { Box } from '@mui/material'
import { PiBooks } from 'react-icons/pi'
import { getJsxWithBoldSubstr } from '@shared/util/getJsxWithBoldSubstr'
import type { ItemPick } from '@back/api/bookmark/getBookmarksHandler'

type Props = {
  inputValueSignal: { value: string }
  option: ItemPick
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
      {props.inputValueSignal.value === ''
        ? props.option.name
        : getJsxWithBoldSubstr({
            text: props.option.name ?? '',
            boldText: props.inputValueSignal.value,
          })}
    </Box>
  )
}
