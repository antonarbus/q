import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState, theme } from 'client/shared/clients'
import { TbCut } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { itemsSlice, saveItemHeightByIndex, selectIsItemAlone } from 'client/entities/items'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { saveItemsLocally } from 'client/shared/lib'
import { copySlice } from 'client/entities/copy'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'

type Props = {
  itemIndex: number
}

export const CutIcon = ({ itemIndex }: Props): JSX.Element => {
  const isItemAlone = useSelectorTyped(selectIsItemAlone)
  const isCuttable = useSelectorTyped(state => state.copy.isCuttable)
  const disabled = isItemAlone || !isCuttable

  return (
    <motion.span
      whileHover={{
        scale: disabled ? 1 : 1.3,
      }}
      whileTap={{ scale: 1 }}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        saveItemHeightByIndex({ itemIndex })

        const itemToCut = getState().items[itemIndex]
        if (!itemToCut) return
        if (itemToCut.type === 'paste') return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof Element)) return

        const html = paperElement.innerHTML
        const cleanedHtml = cleanHtml(html)

        dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: itemToCut, preview: cleanedHtml }))
        dispatch(itemsSlice.actions.deleteItem({ itemId: itemToCut.id }))

        dispatch(copySlice.actions.forbidToPaste())
        dispatch(copySlice.actions.forbidToCopy())
        dispatch(copySlice.actions.forbidToCut())
        dispatch(copySlice.actions.forbidToDelete())

        const isCopyContainer = getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }

        setTimeout(() => {
          dispatch(copySlice.actions.allowToPaste())
          dispatch(copySlice.actions.allowToCopy())
          dispatch(copySlice.actions.allowToCut())
          dispatch(copySlice.actions.allowToDelete())
        }, 1000 * theme.item.animationDuration)

        saveItemsLocally()
      }}
    >
      <TbCut />
    </motion.span>
  )
}
