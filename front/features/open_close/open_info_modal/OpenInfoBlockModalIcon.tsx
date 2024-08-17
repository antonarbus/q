import type { ReactNode, MouseEvent } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getBlockFromStore, itemType, useBlock } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const OpenInfoBlockModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()

  return (
    <Tooltip
      title='info'
      placement='right'
    >
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          className={cls.actionIcon}
          tabIndex={-1}
          onClick={(e: MouseEvent): void => {
            const item = getBlockFromStore({ blockIndex })

            if (!item) return
            if (item.type === itemType.paste) return

            navigate(`./${route.info}/${item.id}`)
          }}
        />
      </span>
    </Tooltip>
  )
}
