import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { flushSync } from 'react-dom'
import { GoTrash } from 'react-icons/go'
import { copySlice } from '@entities/copy'
import {
  quotationSlice,
  selectIsLastBoqRow,
  useBlock,
  useRow,
} from '@entities/quotation'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const DeleteBoqRowIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ blockIndex }))
  const isDeletable = useSelectorTyped((state) => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable

  return (
    <Tooltip
      title='delete'
      placement='right'
    >
      <span className={cls.actionIconContainer}>
        <GoTrash
          className={cls.actionIcon}
          tabIndex={-1}
          style={{
            color: disabled ? '#acacac' : '#000',
          }}
          css={{
            '&:hover': {
              color: disabled ? '#acacac' : 'red !important',
            },
          }}
          onClick={(): void => {
            if (disabled) return

            flushSync(() => {
              dispatch(
                quotationSlice.actions.disableFroalaReducer({ blockIndex }),
              )
            })

            dispatch(
              quotationSlice.actions.deleteBoqRowReducer({
                blockIndex,
                rowIndex,
              }),
            )
            dispatch(copySlice.actions.forbidAllActions())

            setTimeout(() => {
              dispatch(copySlice.actions.allowAllActions())
            }, 1000 * theme.block.animationDuration)

            const isCopyContainer = getState().copy.isCopyContainer

            if (!isCopyContainer) {
              setTimeout(
                () => {
                  dispatch(
                    quotationSlice.actions.enableFroalaReducer({ blockIndex }),
                  )
                },
                1000 * theme.block.animationDuration + 500,
              )
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
