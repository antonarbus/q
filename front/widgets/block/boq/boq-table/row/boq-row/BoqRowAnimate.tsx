import { theme } from '@shared/theme'
import { motion } from 'motion/react'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowAnimate = ({ children }: Props): JSX.Element => {
  return (
    <motion.div
      animate={{
        height: 'auto', // height is being stored on copy/cut icon click
        opacity: 1,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
        y: 0,
      }}
      exit={{
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        x: '150vw',
      }}
      initial={{
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        y: '100vh',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
    >
      {children}
    </motion.div>
  )
}
