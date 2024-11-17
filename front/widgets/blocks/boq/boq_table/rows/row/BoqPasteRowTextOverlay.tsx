import { theme } from '@shared/theme'
import { motion } from 'motion/react'

export const BoqPasteRowTextOverlay = (): React.JSX.Element => (
  <motion.div
    initial={{
      height: 0,
      opacity: 0,
    }}
    animate={{
      height: 40,
      opacity: 1,
    }}
    exit={{
      height: 0,
      opacity: 0,
    }}
    transition={{
      height: {
        duration: theme.block.animationDuration,
      },
      opacity: {
        duration: 0,
      },
    }}
    style={{
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: theme.copy.pasteTextColor,
      userSelect: 'none',
      borderBottom: '1px solid #e8e8e8',
      marginBottom: '-1px',
    }}
  >
    Paste here
  </motion.div>
)
