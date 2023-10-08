import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { theme } from 'client/shared/clients'
import { motion } from 'framer-motion'

export const BoqRowPasteItem = (): EmotionJSX.Element => (
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
      height: { duration: theme.item.animationDuration },
      opacity: { duration: 0 },
    }}
    css={{
      display: 'grid',
      placeItems: 'center',
      fontWeight: 600,
      color: theme.copy.pasteTextColor,
      userSelect: 'none',
      borderBottom: '1px solid #e8e8e8',
    }}
  >
    Paste here
  </motion.div>
)
