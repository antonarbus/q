import { motion } from 'motion/react'
import { cls } from '@shared/const/cls'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const FadeInOnInitLoad = ({ children }: Props): JSX.Element => {
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      className={cls.blocks}
      initial={{
        opacity: 0,
      }}
      style={{
        display: 'inline-flex', // needed for .pdf and to avoid problems with boq in narrow window
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '25px 10px',
      }}
      transition={{
        delay: 0.7, // to show "Q" logo on init load to avoid some jumps
      }}
    >
      {children}
    </motion.div>
  )
}
