import type { ReactNode, MouseEvent } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getBlockFromStore, itemType, useBlock } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'
import { useIsCopyModalVisible } from '@entities/copy'

export const OpenInfoBlockModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

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
          aria-hidden={false} // otherwise error in dev tools
          tabIndex={-1}
          style={{
            color: disabled ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          onClick={(e: MouseEvent): void => {
            if (disabled) return

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
