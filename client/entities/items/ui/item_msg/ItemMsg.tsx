import { useSelectorTyped } from '@libras/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useItem } from '../../providers/ItemProvider'
import { useRemoveItemMsgAfterSomeTime } from './useRemoveItemMsg'

export const ItemMsg = (): JSX.Element => {
  const { itemIndex } = useItem()
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)
  useRemoveItemMsgAfterSomeTime()

  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={{
            position: 'absolute',
            top: -15,
            right: 10,
            fontSize: 10,
            color: '#929292',
            fontWeight: 500,
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
