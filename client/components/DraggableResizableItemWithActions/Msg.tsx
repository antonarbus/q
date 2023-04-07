import { useSelectorTyped } from 'client/store'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  index: number
}

export const Msg = ({ index }: Props) => {
  const msg = useSelectorTyped(state => state.items[index]?.msg)

  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={{
            position: 'absolute',
            top: -17,
            right: 10,
            fontSize: 10,
            color: '#929292',
            fontWeight: 500,
            userSelect: 'none',
            zIndex: -1
          }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
