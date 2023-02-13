import { motion } from 'framer-motion'

export const PasteInBetween = () => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 30, opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{
      ease: 'linear',
      height: { duration: 0.3 },
      opacity: { duration: 0.1 },
    }}
    css={{
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: '#b4b4b4',
      cursor: 'default',
      userSelect: 'none',
    }}
  >
    Paste here
  </motion.div>
)
