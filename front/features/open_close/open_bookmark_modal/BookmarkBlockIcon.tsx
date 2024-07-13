import { dispatch, getState } from '@lib_instances/store'
import { type ReactNode, type MouseEvent } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  getBlockFromStore,
  itemKey,
  quotationSlice,
  saveBlockHeightByIndex,
  useItem,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const BookmarkBlockIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()

  return (
    <MdOutlineStarOutline
      className='save-item-icon'
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const email = getState().user.email

        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate(`./${route.login}`)
          return
        }

        saveBlockHeightByIndex({ itemIndex })

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return

        const itemElement = clickedIconElement.closest(`.${cls.block}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${cls.paper}`)
        if (!(paperElement instanceof Element)) return
        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        const item = getBlockFromStore({ itemIndex })

        if (!item) return
        if (item.type === itemKey.paste) return

        dispatch(
          quotationSlice.actions.updateItemPreviewByIdReducer({
            id: item.id,
            preview: cleanedHtml,
          }),
        )

        navigate(`./${route.bookmark}/${item.id}`)
      }}
    />
  )
}
