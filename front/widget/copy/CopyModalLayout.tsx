import { type AnimationScope, motion } from 'motion/react'
import type { JSX, ReactNode } from 'react'
import { useCursorPos } from './useCursorPos'

type Props = {
  children: ReactNode
  ref: AnimationScope<HTMLDivElement>
}

export const CopyModalLayout = (props: Props): JSX.Element => {
  useCursorPos({ copyModalRef: props.ref })

  return (
    <motion.div
      ref={props.ref}
      css={{
        position: 'fixed',
        // top: '30px', //  <-- update on cursor move
        // left: '30px', // <-- update on cursor move
        zIndex: 1001,
        height: 0,
        width: 0,
        maxHeight: 265,
        overflow: 'hidden',
        '.static-html': {
          opacity: '1 !important',
        },

        // liquid glass
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        style={{
          margin: 10, // needed to have a gap at the bottom specifically, otherwise overflow: hidden trims the content at the bottom edge
          padding: 10, // needed to avoid shadow trimming by overflow: hidden
          overflowY: 'hidden',
          maxHeight: 240,
        }}
      >
        {props.children}
      </div>
    </motion.div>
  )
}
