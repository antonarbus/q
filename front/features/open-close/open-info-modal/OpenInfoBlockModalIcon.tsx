import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getBlockFromStore, itemType, useBlock } from '@entities/quotation'
import { route } from '@shared/const/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/const/cls'
import { useIsCopyModalVisible } from '@entities/copy'
import type { ReactNode, MouseEvent } from 'react'

export const OpenInfoBlockModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='right'
      title='Info'
    >
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          aria-hidden={false} // otherwise error in dev tools
          className={cls.actionIcon}
          onClick={(event: MouseEvent): void => {
            if (disabled === true) {
              return
            }

            const item = getBlockFromStore({ blockIndex })

            if (item === undefined) {
              return
            }

            if (item.type === itemType.paste) {
              return
            }

            void navigate(`./${route.info}/${item.id}`)
          }}
          style={{
            color: disabled === true ? '#acacac' : '#000',
            cursor: 'pointer',
            touchAction: 'none',
          }}
          tabIndex={-1}
        />
      </span>
    </Tooltip>
  )
}
