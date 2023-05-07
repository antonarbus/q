import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { TbCut } from 'react-icons/tb'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from 'client/features/copy/copySlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { motion } from 'framer-motion'
import { deleteItem, selectIsLastItem } from '../../features/items/itemsSlice'
import { tellItemsSavedLocally } from 'client/features/bottom msg/bottomMsgSlice'
import { TRefResizable } from 'client/types'
import { cleanHtml } from 'utils/itemsUtils'

type TProps = {
  itemRef: TRefResizable
  index: number
}

export const CutIcon = ({ index, itemRef }: TProps) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(selectIsLastItem)

  return (
    <motion.span
      whileHover={{ scale: isLastItem ? 1 : 1.3 }}
      whileTap={{ scale: 1 }}
      style={{
        color: isLastItem ? '#acacac' : '#000',
        cursor: isLastItem ? 'default' : 'pointer',
      }}
      onClick={(e: React.MouseEvent) => {
        if (isLastItem) return
        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCut = store.getState().items[index]
        const itemHtml = itemRef.current.resizable?.innerHTML || ''
        const item = { ...itemToCut, previewHtml: cleanHtml(itemHtml) }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem(itemToCut))
        saveItemsIntoLocalStorage()
        dispatch(tellItemsSavedLocally())
      }}
    >
      <TbCut/>
    </motion.span>
  )
}
