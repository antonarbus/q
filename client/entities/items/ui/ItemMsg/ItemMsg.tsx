import { useSelectorTyped } from 'client/shared/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { useRemoveItemMsgAfterSomeTime } from './useRemoveItemMsg'

interface IProps {
  index: number
}

export const ItemMsg = ({ index }: IProps): JSX.Element => {
  const msg = useSelectorTyped(state => state.items[index]?.msg)
  useRemoveItemMsgAfterSomeTime({ index })

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
