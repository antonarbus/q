import { dispatch, getState } from '@lib_instances/store'
import type { MouseEvent, ReactNode } from 'react'
import { MdOutlineStarOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  boqRowKey,
  getBoqRowFromStore,
  quotationSlice,
  useBlock,
  useRow,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const BookmarkBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { blockIndex } = useBlock()
  const { rowIndex } = useRow()

  return (
    <MdOutlineStarOutline
      className='save-boq-row-icon'
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const email = getState().user.email

        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate(`./${route.login}`)
          return
        }

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest(`.${cls.boqRow}`)
        if (!boqRowElement) return

        dispatch(
          quotationSlice.actions.updateBoqRowHeightAndWidthReducer({
            blockIndex,
            rowIndex,
            height: boqRowElement.clientHeight,
            width: boqRowElement.clientWidth,
          }),
        )

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const boqRow = getBoqRowFromStore({ rowIndex, blockIndex })

        if (!boqRow) return
        if (boqRow.type === boqRowKey.paste) return

        dispatch(
          quotationSlice.actions.updateItemPreviewReducer({
            id: boqRow.id,
            preview: cleanedHtml,
          }),
        )

        dispatch(
          quotationSlice.actions.loadBlockAtPosThousandReducer({
            block: boqRow,
          }),
        )

        navigate(`./${route.bookmark}/${boqRow.id}`)
      }}
    />
  )
}
