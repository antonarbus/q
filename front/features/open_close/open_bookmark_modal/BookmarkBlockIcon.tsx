import { dispatch, getState } from '@lib_instances/store'
import type { ReactNode, MouseEvent } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  getBlockFromStore,
  itemType,
  quotationSlice,
  saveBlockHeightByIndex,
  useBlock,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'
import { Tooltip } from '@mui/material'

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

            const clickedIconElement = e.target
            if (!(clickedIconElement instanceof Element)) return

            const itemElement = clickedIconElement.closest(`.${cls.block}`)
            if (!(itemElement instanceof Element)) return
            const paperElement = itemElement.querySelector(`.${cls.paper}`)
            if (!(paperElement instanceof Element)) return
            const html = paperElement.innerHTML
            const cleanedHtml = cleanHtml(html)

            const item = getBlockFromStore({ blockIndex })

            if (!item) return
            if (item.type === itemType.paste) return

            dispatch(
              quotationSlice.actions.updateItemPreviewReducer({
                id: item.id,
                preview: cleanedHtml,
              }),
            )

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({
                block: item,
              }),
            )

            navigate(`./${route.bookmark}/${item.id}`)
          }}
        />
      </span>
    </Tooltip>
  )
}
