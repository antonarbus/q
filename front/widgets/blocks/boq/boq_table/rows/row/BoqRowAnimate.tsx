import { theme } from '@shared/theme'
import { motion } from 'motion/react'

type Props = {
  children: React.ReactNode
}

export const BoqRowAnimate = ({ children }: Props): React.JSX.Element => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        y: '100vh',
      }}
      animate={{
        height: 'auto', // height is being stored on copy/cut icon click
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        x: '150vw',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
    >
      {children}
    </motion.div>
  )
}
