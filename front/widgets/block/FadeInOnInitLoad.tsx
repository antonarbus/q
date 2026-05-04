import { cls } from '@front/shared/cls'
import { motion } from 'motion/react'

type Props = {
  children: React.ReactNode
}

export const FadeInOnInitLoad = (props: Props): React.JSX.Element => {
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
        // Needed for .pdf and to avoid problems with boq in narrow window
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '25px 10px 5px 10px',
      }}
      transition={{
        // To show "Q" logo on init load to avoid some jumps
        delay: 0.7,
      }}
    >
      {props.children}
    </motion.div>
  )
}
