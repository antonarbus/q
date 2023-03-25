import { theme } from 'client/theme'
import { motion } from 'framer-motion'

export const PasteText = () => (
  <motion.div
    initial={{
      height: 0,
      marginBottom: 0,
      opacity: 0,
    }}
    animate={{
      height: 20,
      marginBottom: 20,
      opacity: 1,
    }}
    exit={{
      height: 0,
      marginBottom: 0,
      opacity: 0,
    }}
    transition={{
      height: { duration: theme.item.animationDuration },
      marginBottom: { duration: theme.item.animationDuration },
      opacity: { duration: 0 },
    }}
    css={{
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: theme.copy.pasteTextColor,
      userSelect: 'none',
    }}
  >
    Paste here
  </motion.div>
)
