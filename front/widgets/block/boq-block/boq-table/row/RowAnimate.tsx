import { theme } from '@front/shared/theme'
import { motion } from 'motion/react'

type Props = {
  children: React.ReactNode
}

export const RowAnimate = (props: Props): React.JSX.Element => {
  return (
    <motion.div
      className='boq-row-animate'
      animate={{
        height: 'auto', // height is being stored on copy/cut icon click
        opacity: 1,
        transitionEnd: {
          height: 'auto',
        },
        y: 0,
      }}
      exit={{
        height: 0,
        opacity: 0,
        x: '150vw',
      }}
      initial={{
        height: 0,
        opacity: 0,
        y: '100vh',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
    >
      {props.children}
    </motion.div>
  )
}
