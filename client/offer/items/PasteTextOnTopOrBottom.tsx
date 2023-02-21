import { motion } from 'framer-motion'
import { useState } from 'react'

export const PasteTextOnTopOrBottom = () => {
  const [isExitAnimated, setIsExitAnimated] = useState(true) // disable exit animation on click

  return (
    <motion.div
      // onClick={() => setIsExitAnimated(false)}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ ...(isExitAnimated && { height: 0, opacity: 0 }) }}
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
    >
      Paste here
    </motion.div>
  )
}
