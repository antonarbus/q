import { motion } from 'framer-motion'
import { useState } from 'react'

export const PasteTextOnTopOrBottom = () => {
  const [isExitAnimated, setIsExitAnimated] = useState(true)
  console.log('🚀 ~ file: PasteTextOnTopOrBottom.tsx:6 ~ PasteTextOnTopOrBottom ~ state', isExitAnimated)

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ ...(isExitAnimated && { height: 0, opacity: 0 }) }} //! item is pasted immediately, but PasteText exits with animation, need to disable animation on before paste
      transition={{
        height: { duration: 0.3 },
        opacity: { duration: 0 },
      }}
      css={{
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600,
        color: '#b4b4b4',
        cursor: 'default',
        userSelect: 'none',
      }}
      onClick={() => setIsExitAnimated(false)}
    >
      Paste here
    </motion.div>
  )
}
