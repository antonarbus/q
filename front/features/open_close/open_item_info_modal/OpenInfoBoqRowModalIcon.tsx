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

export const OpenInfoBoqRowModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  return (
    <HiOutlineInformationCircle
      className='open-info-boq-row-modal-icon'
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

        if (!boqRow) return
        if (boqRow.type === boqRowKey.paste) return

        navigate(`./${route.infoItem}/${boqRow.id}`)
      }}
    />
  )
}
