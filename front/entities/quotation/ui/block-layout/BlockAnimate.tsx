import { Box } from '@mui/material'
import { cls } from '@front/shared/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@front/shared/lib/re-resizable/resizablePaper'
import { theme } from '@front/shared/theme'
import { motion } from 'motion/react'
import type { ResizableProps } from 're-resizable'

import { ResizableBlockPaper } from './ResizableBlockPaper'

type Props = {
  children: React.ReactNode
  blockHeight: number
  id: string
  leftItemActionButtons?: React.ReactNode
  rightItemActionButtons?: React.ReactNode
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
  className?: string
  disableResize?: boolean
}

export const BlockAnimate = (props: Props): React.JSX.Element => {
  return (
    <motion.div
      animate={{
        // height is being stored on copy/cut icon click
        height: props.blockHeight,
        // wrapper has 20px, so total = 20
        marginBottom: 0,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      className={cls.block + (props.className === undefined ? '' : ` ${props.className}`)}
      exit={{
        height: 0,
        // wrapper has 20px, so total = 0
        marginBottom: -20,
        opacity: 0,
        x: '110vw',
        overflow: 'hidden',
      }}
      id={props.id}
      initial={{
        height: 0,
        // wrapper has 20px, so total = 0
        marginBottom: -20,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
    >
      {Boolean(props.leftItemActionButtons) && (
        <Box style={{ paddingTop: '5px' }}>{props.leftItemActionButtons}</Box>
      )}
      <ResizableBlockPaper
        autoWidth={props.autoWidth}
        disableResize={props.disableResize}
        minWidth={props.minWidth}
        onItemResize={props.onItemResize}
        onItemResizeStart={props.onItemResizeStart}
        onItemResizeStop={props.onItemResizeStop}
      >
        {props.children}
      </ResizableBlockPaper>
      {Boolean(props.rightItemActionButtons) && (
        <Box style={{ paddingTop: '5px' }}>{props.rightItemActionButtons}</Box>
      )}
    </motion.div>
  )
}
