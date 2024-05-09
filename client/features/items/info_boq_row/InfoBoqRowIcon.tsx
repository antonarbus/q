import { getState } from '@lib_instances/store'
import { type MouseEvent, type ReactNode } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { boqRowKey, getBoqRowFromStore, useItem, useRow } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const InfoBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

  return (
    <HiOutlineInformationCircle
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const email = getState().user.email

        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate('./login')
          return
        }

        const boqRow = getBoqRowFromStore({ rowIndex, itemIndex })

        if (!boqRow) return
        if (boqRow.type === boqRowKey.paste) return

        navigate(`./${route.itemInfo}`, {
          state: {
            item: boqRow,
            itemIndex,
            rowIndex,
          },
        })
      }}
    />
  )
}
