import { type ReactNode, type MouseEvent } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getItemFromStore, itemKey, useItem } from '@entities/quotation'
import { route } from '@shared/consts/route'

export const OpenInfoItemModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()

  return (
    <HiOutlineInformationCircle
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const item = getItemFromStore({ itemIndex })

        if (!item) return
        if (item.type === itemKey.paste) return

        navigate(`./${route.infoBookmark}/${item.id}`)
      }}
    />
  )
}
