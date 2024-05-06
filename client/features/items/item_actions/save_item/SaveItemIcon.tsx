import { getState } from '@lib_instances/store'
import { type ReactNode, type MouseEvent } from 'react'
import { BsBookmarks } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { getItemFromStore, itemKey, saveItemHeightByIndex, useItem } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'

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

        saveItemHeightByIndex({ itemIndex })

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return

        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return
        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        const item = getItemFromStore({ itemIndex })

        if (!item) return
        if (item.type === itemKey.paste) return

        const itemToSave = structuredClone(item)
        itemToSave.preview = cleanedHtml

        navigate(`./${route.saveItem}`, { state: { itemToSave } })
      }}
    />
  )
}
