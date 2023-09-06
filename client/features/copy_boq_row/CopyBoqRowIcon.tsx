import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState } from 'client/shared/clients'
import { MdCopyAll } from 'react-icons/md'
import { motion } from 'framer-motion'
import { cleanHtml } from 'client/shared/lib/itemsUtils'
import { copySlice } from 'client/entities/copy'
import { saveItemHeightByIndex } from 'client/entities/items'
import type { MouseEvent } from 'react'
import { className } from 'client/shared/className'
import type { BoqRow } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRow
}

export const CopyBoqRowIcon = ({ index, rowIndex, boqRow }: Props): JSX.Element => {
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <motion.span
      whileHover={{
        scale: disabled ? 1 : 1.3,
      }}
      whileTap={{ scale: 1 }}
      css={{
        position: 'relative',
        top: 1,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        // todo: as our icon inside tr we can get it easier then by index
        // saveItemHeightByIndex({ index })

        const itemToCopy = boqRow

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const boqRowElement = clickedIconElement.closest('.tr')
        console.log('🚀  boqRowElement:', boqRowElement)
        if (!(boqRowElement instanceof Element)) return


        const html = boqRowElement.outerHTML
        const cleanedHtml = cleanHtml(html)

        const item = { ...itemToCopy, previewHtml: cleanedHtml }

        // todo: add width and height on boq row items
        // todo: may be add dedicated reducer or rename this one or make universal, to be checked
        dispatch(copySlice.actions.addItemIntoCopyContainer(item))
        dispatch(copySlice.actions.allowToPaste())

        const isCopyContainer = getState().copy.isCopyContainer
        if (!isCopyContainer) {
          dispatch(copySlice.actions.saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
          dispatch(copySlice.actions.showCopyContainer())
        }
      }}
    >
      <MdCopyAll />
    </motion.span>
  )
}
