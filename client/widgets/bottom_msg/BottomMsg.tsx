import { useSelectorTyped } from 'client/shared/hooks'
import { AnimatePresence, motion } from 'framer-motion'

export const BottomMsg = (): JSX.Element => {
  const msg = useSelectorTyped(state => state.bottomMsg.msg)

  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          css={{
            position: 'fixed',
            bottom: 5,
            right: 5,
            fontSize: 14,
            color: '#828282',
            fontWeight: 500,
            userSelect: 'none',
          }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
