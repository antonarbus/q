import { getState } from '@lib_instances/store'
import { type ReactNode, type MouseEvent } from 'react'
import { BsBookmarks } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { getItemFromStore, itemKey, useItem } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const SaveItemIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()

  return (
    <BsBookmarks
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const email = getState().user.email

        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate('./login')
          return
        }

        const item = getItemFromStore({ itemIndex })

        if (!item) return
        if (item.type === itemKey.paste) return

        navigate(`./${route.editItem}`, { state: { itemToSave: item } })
      }}
    />
  )
}
