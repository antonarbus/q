import { theme } from '@shared/theme'
import { motion } from 'motion/react'
import { useBlock } from '@entities/quotation'

export const PasteItem = (): React.JSX.Element => {
  const { block } = useBlock()

  return (
    <motion.div
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
      id={block.id}
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
      }}
      style={{
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600,
        color: theme.copy.pasteTextColor,
        userSelect: 'none',
      }}
      transition={{
        height: { duration: theme.block.animationDuration },
        marginBottom: { duration: theme.block.animationDuration },
        opacity: { duration: 0 },
      }}
    >
      Paste here
    </motion.div>
  )
}
