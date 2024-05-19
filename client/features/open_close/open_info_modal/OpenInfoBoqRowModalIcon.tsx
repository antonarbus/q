import { type MouseEvent, type ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { boqRowKey, getBoqRowFromStore, useItem, useRow } from '@entities/quotation'
import { route } from '@shared/consts/route'

export const OpenInfoBoqRowModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

  return (
    <HiOutlineInformationCircle
      className='open-info-boq-row-modal-icon'
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const boqRow = getBoqRowFromStore({ rowIndex, itemIndex })

        if (!boqRow) return
        if (boqRow.type === boqRowKey.paste) return

        navigate(`./${route.infoBookmark}/${boqRow.id}`)
      }}
    />
  )
}
