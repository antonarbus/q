import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useRow } from '@front/entities/quotation/provider/row/useRow'
import { aiSuggestRowSlice } from '@front/entities/ai/aiSuggestRowSlice'
import { Tooltip } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { LuSparkles } from 'react-icons/lu'

export const OpenAiSuggestRowModalIcon = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='right' title='AI suggestion'>
      <span className={cls.actionIconContainer}>
        <LuSparkles
          className={cls.actionIcon}
          tabIndex={-1}
          onClick={(): void => {
            reduxHolder.dispatch(
              aiSuggestRowSlice.actions.open({ blockIndex: block.index, rowIndex: row.index }),
            )
          }}
        />
      </span>
    </Tooltip>
  )
}
