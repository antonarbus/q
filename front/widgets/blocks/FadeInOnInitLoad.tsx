import { motion } from 'motion/react'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
}

export const FadeInOnInitLoad = ({ children }: Props): React.JSX.Element => {
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
        padding: '20px 10px',
      }}
      transition={{
        delay: 0.7, // to show "Q" logo on init load to avoid some jumps
      }}
    >
      {children}
    </motion.div>
  )
}
