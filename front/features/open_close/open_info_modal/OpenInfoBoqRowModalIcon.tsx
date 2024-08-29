import type { MouseEvent, ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  useBlock,
  useRow,
} from '@entities/quotation'
import { route } from '@shared/consts/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'
import type { NavigateState } from '@shared/types/NavigateState'

export const OpenInfoBoqRowModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  return (
    <Tooltip
      title='info'
      placement='right'
      enterDelay={500}
      enterNextDelay={500}
    >
      <span className={cls.actionIconContainer}>
        <HiOutlineInformationCircle
          className={cls.actionIcon}
          tabIndex={-1}
          onClick={(e: MouseEvent): void => {
            const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

            if (!boqRow) return
            if (boqRow.type === boqRowKey.paste) return

            const navigateState: NavigateState = {
              scrollTop:
                document.documentElement.scrollTop || document.body.scrollTop,
            }

            navigate(`./${route.info}/${boqRow.id}`, {
              state: navigateState,
            })
          }}
        />
      </span>
    </Tooltip>
  )
}
