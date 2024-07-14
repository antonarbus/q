import { type ReactNode, type MouseEvent } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { getBlockFromStore, itemKey, useBlock } from '@entities/quotation'
import { route } from '@shared/consts/route'

export const OpenInfoBlockModalIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()

  return (
    <HiOutlineInformationCircle
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const item = getBlockFromStore({ blockIndex })

        if (!item) return
        if (item.type === itemKey.paste) return

        navigate(`./${route.infoItem}/${item.id}`)
      }}
    />
  )
}
