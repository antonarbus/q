import { motion } from 'framer-motion'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
}

export const FadeInOnInitLoad = ({ children }: Props): React.JSX.Element => {
  return (
    <motion.div
      className={cls.blocks}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.7, // to show "Q" logo on init load to avoid some jumps
      }}
      style={{
        display: 'inline-flex', // needed for .pdf and to avoid problems with boq in narrow window
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '20px 10px',
      }}
    >
      {children}
    </motion.div>
  )
}
