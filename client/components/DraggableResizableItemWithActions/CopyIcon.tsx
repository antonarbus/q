import { store, useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { MdCopyAll } from 'react-icons/md'
import { addItemIntoCopyContainer, saveInitCordsOfCopyContainer, showCopyContainer } from '../../features/copy/copySlice'
import { motion } from 'framer-motion'

type Props = {
  itemRef: React.MutableRefObject<Resizable>
  index: number
}

export const CopyIcon = ({ itemRef, index }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <motion.span
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 1 }}
      css={{
        cursor: 'pointer',
        position: 'relative',
        top: 1,
      }}
      onClick={(e: React.MouseEvent) => {
        dispatch(saveInitCordsOfCopyContainer({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const itemToCopy = store.getState().items[index]
        // const itemHeight = itemRef?.current?.resizable?.clientHeight || 0
        // const item = { ...itemToCopy, height: itemHeight }
        const itemHtml = itemRef.current.resizable?.innerHTML || ''
        const itemHtmlCleaned = itemHtml.replaceAll('contenteditable="true"', '')
        const item = { ...itemToCopy, previewHtml: itemHtmlCleaned }
        dispatch(addItemIntoCopyContainer(item))
      }}
    >
      <MdCopyAll/>
    </motion.span>
  )
}
