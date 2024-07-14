import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'
import { useBlock } from '@entities/quotation'

export const PasteItem = (): EmotionJSX.Element => {
  const { id } = useBlock()

  return (
    <motion.div
      id={id}
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
        height: { duration: theme.block.animationDuration },
        marginBottom: { duration: theme.block.animationDuration },
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
}
