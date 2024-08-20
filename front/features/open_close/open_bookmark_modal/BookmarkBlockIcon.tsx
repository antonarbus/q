import { dispatch, getState } from '@lib_instances/store'
import type { ReactNode, MouseEvent } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { Tooltip } from '@mui/material'
import {
  getBlockFromStore,
  itemType,
  quotationSlice,
  saveBlockHeightByIndex,
  useBlock,
} from '@entities/quotation'
import { getPaperElementHtml } from '@shared/utils'

export const BookmarkBlockIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()

  return (
    <Tooltip
      title='add to bookmarks'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdOutlineStarOutline
          tabIndex={-1}
          className={cls.actionIcon}
          onClick={(e: MouseEvent): void => {
            const email = getState().user.email

            if (!email) {
              notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
              navigate(`./${route.login}`)
              return
            }

            saveBlockHeightByIndex({ blockIndex })
            const html = getPaperElementHtml(e)
            const block = getBlockFromStore({ blockIndex })

            if (!block) return
            if (block.type === itemType.paste) return

            dispatch(
              quotationSlice.actions.updateItemPreviewReducer({
                id: block.id,
                preview: html,
              }),
            )

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
