import { AnimatePresence, motion } from 'framer-motion'
import { bottomMsg } from '@shared/bottom_msg'

export const BottomMsg = (): JSX.Element => {
  return (
    <AnimatePresence>
      {bottomMsg.value !== '' && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
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
          {bottomMsg.value}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
