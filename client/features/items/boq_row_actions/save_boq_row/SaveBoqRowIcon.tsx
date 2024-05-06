import { dispatch, getState } from '@lib_instances/store'
import { type MouseEvent, type ReactNode } from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { boqRowKey, getBoqRowFromStore, quotationSlice, useItem, useRow } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'
import { cleanHtml } from '@shared/utils/itemsUtils'

export const SaveBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

  return (
    <BsBookmarkPlus
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        const email = getState().user.email

        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate('./login')
          return
        }

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return

        const boqRowElement = clickedIconElement.closest(`.${className.boqRow}`)
        if (!boqRowElement) return

        dispatch(quotationSlice.actions.updateBoqRowHeightAndWidthReducer({
          itemIndex,
          rowIndex,
          height: boqRowElement.clientHeight,
          width: boqRowElement.clientWidth,
        }))

        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const boqRow = getBoqRowFromStore({ rowIndex, itemIndex })

        if (!boqRow) return
        if (boqRow.type === boqRowKey.paste) return

        const itemToSave = structuredClone(boqRow)
        itemToSave.preview = cleanedHtml

        navigate(`./${route.saveItem}`, { state: { itemToSave } })
      }}
    />
  )
}
