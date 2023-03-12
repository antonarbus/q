import { motion } from 'framer-motion'

export const PasteTextOnTopOrBottom = () => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        marginBottom: 0
      }}
      animate={{
        height: 20,
        opacity: 1,
        marginBottom: 20
      }}
      exit={{
        height: 0,
        opacity: 0,
        marginBottom: 0
      }}
      transition={{
        height: { duration: 0.3 },
        opacity: { duration: 0 },
      }}
      css={{
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600,
        color: '#b4b4b4',
        userSelect: 'none',
      }}
    >
      Paste here
    </motion.div>
  )
}
