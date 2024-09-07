import type { ReactNode, MouseEvent } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getBlockFromStore, itemType, useBlock } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'
import type { NavigateState } from '@shared/types/NavigateState'

export const OpenInfoBlockModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()

  return (
    <Tooltip
      title='Info'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          className={cls.actionIcon}
          tabIndex={-1}
          onClick={(e: MouseEvent): void => {
            const item = getBlockFromStore({ blockIndex })

            if (!item) return
            if (item.type === itemType.paste) return

            const navigateState: NavigateState = {
              scrollTop:
                document.documentElement.scrollTop || document.body.scrollTop,
            }

            navigate(`./${route.info}/${item.id}`, {
              state: navigateState,
            })
          }}
        />
      </span>
    </Tooltip>
  )
}
