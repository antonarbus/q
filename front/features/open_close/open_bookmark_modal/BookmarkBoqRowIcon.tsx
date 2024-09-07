import { dispatch, getState } from '@lib_instances/store'
import type { MouseEvent, ReactNode } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  quotationSlice,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/toast'
import { Tooltip } from '@mui/material'
import type { NavigateState } from '@shared/types/NavigateState'

export const BookmarkBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  return (
    <Tooltip
      title='Add to bookmarks'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <MdOutlineStarOutline
          className={cls.actionIcon}
          tabIndex={-1}
          onClick={(e: MouseEvent): void => {
            const email = getState().user.email

            if (!email) {
              notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
              navigate(`./${route.login}`)
              return
            }

            const clickedIconElement = e.target
            if (!(clickedIconElement instanceof Element)) return

            const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)
            if (!boqRowElement) return

            const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

            if (!boqRow) return
            if (boqRow.type === boqRowKey.paste) return

            dispatch(
              quotationSlice.actions.loadBlockAtPosThousandReducer({
                block: boqRow,
              }),
            )

            const navigateState: NavigateState = {
              scrollTop:
                document.documentElement.scrollTop || document.body.scrollTop,
            }

            navigate(`./${route.bookmark}/${boqRow.id}`, {
              state: navigateState,
            })
          }}
        />
      </span>
    </Tooltip>
  )
}
