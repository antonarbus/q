import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'

export const PasteItem = (): EmotionJSX.Element => (
  <motion.div
    className='paste-item'
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
    style={{
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
