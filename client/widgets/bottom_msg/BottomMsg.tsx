import { useSelectorTyped } from '@libras/store'
import { AnimatePresence, motion } from 'framer-motion'

export const BottomMsg = (): JSX.Element => {
  const bottomMsg = useSelectorTyped(state => state.app.bottomMsg)

  return (
    <AnimatePresence>
      {Boolean(bottomMsg) && (
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
          {bottomMsg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
