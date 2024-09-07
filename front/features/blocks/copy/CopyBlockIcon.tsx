import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import type { MouseEvent } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { copySlice } from '@entities/copy'
import {
  isFroalaSignal,
  itemType,
  saveBlockHeightByIndex,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { Tooltip } from '@mui/material'
import { getClosestPaperElementHtml } from '@shared/utils'

export const CopyBlockIcon = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const isCopyable = useSelectorTyped((state) => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <Tooltip
      title='Copy'
      placement='left'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdCopyAll
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            position: 'relative',
            top: 1,
            cursor: disabled ? 'default' : 'pointer',
            color: disabled ? '#acacac' : '#000',
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled) return

            saveBlockHeightByIndex({ blockIndex })

            const blockToCopy = getState().quotation.blocks[blockIndex]
            if (!blockToCopy) return
            if (blockToCopy.type === itemType.paste) return

            const html = getClosestPaperElementHtml(e)
            isFroalaSignal.value = false

            const block = structuredClone(blockToCopy)
            block.preview = html
            dispatch(
              copySlice.actions.addItemIntoCopyContainer({ item: block }),
            )

            dispatch(copySlice.actions.allowToPaste())

            const isCopyContainer = getState().copy.isCopyContainer

            if (!isCopyContainer) {
              dispatch(copySlice.actions.showCopyContainer())
            }
          }}
        />
      </span>
    </Tooltip>
  )
}
