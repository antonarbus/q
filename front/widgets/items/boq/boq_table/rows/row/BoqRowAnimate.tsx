import { theme } from '@lib_instances/theme'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

export const BoqRowAnimate = ({ children }: Props): JSX.Element => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
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
        x: '150vw',
        overflow: 'hidden',
      }}
      transition={{
        duration: theme.item.animationDuration,
      }}
    >
      {children}
    </motion.div>
  )
}
