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
      initial={{
        opacity: 0,
      }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
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
