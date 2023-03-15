import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { TbCut } from 'react-icons/tb'
import { Resizable } from 're-resizable'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from 'client/features/copy/copySlice'
import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { motion } from 'framer-motion'
import { ItemType } from '../../features/items/types'
import { deleteItem, selectIsLastItem } from '../../features/items/offerSlice'

type Props = {
  itemToCut: ItemType,
  itemRef: React.MutableRefObject<Resizable>
}

export const CutIcon = ({ itemToCut, itemRef }: Props) => {
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
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const item = { ...itemToCut, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem(itemToCut))
        saveOfferIntoLocalStorage()
      }}
    >
      <TbCut/>
    </motion.span>
  )
}
