import { dispatch, getState } from '@lib_instances/store'
import type { ReactNode, MouseEvent } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/toast'
import { Tooltip } from '@mui/material'
import {
  getBlockFromStore,
  itemType,
  quotationSlice,
  useBlock,
} from '@entities/quotation'
import { useIsCopyModalVisible } from '@entities/copy'

export const BookmarkBlockIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

  return (
    <Tooltip
      title='Add to bookmarks'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdOutlineStarOutline
          tabIndex={-1}
          className={cls.actionIcon}
          style={{
            color: disabled ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled) return

            const email = getState().user.email

            if (!email) {
              notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
              navigate(`./${route.login}`)

              return
            }

            const block = getBlockFromStore({ blockIndex })

            if (!block) return
            if (block.type === itemType.paste) return

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({ block }),
            )

            navigate(`./${route.bookmark}/${block.id}`)
          }}
        />
      </span>
    </Tooltip>
  )
}
