import type { MouseEvent, ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  isDraggingSignal,
  useBlock,
  useRow,
} from '@entities/quotation'
import { route } from '@shared/consts/route'
import { Tooltip } from '@mui/material'
import { cls } from '@shared/consts/cls'

export const OpenInfoBoqRowModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  return (
    <Tooltip
      title='info'
      placement='right'
      disableHoverListener={isDraggingSignal.value}
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

            navigate(`./${route.info}/${boqRow.id}`)
          }}
        />
      </span>
    </Tooltip>
  )
}
