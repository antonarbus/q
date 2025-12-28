import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import { theme } from '@shared/theme'
import { motion } from 'motion/react'
import type { ResizableProps } from 're-resizable'
import type { JSX, ReactNode } from 'react'
import { ResizableBlockPaper } from './ResizableBlockPaper'

type Props = {
  children: ReactNode
  blockHeight: number
  id: string
  leftItemActionButtons?: ReactNode
  rightItemActionButtons?: ReactNode
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
  className?: string
}

export const BlockAnimate = (props: Props): JSX.Element => {
  return (
    <motion.div
      animate={{
        height: props.blockHeight, // height is being stored on copy/cut icon click
        marginBottom: 20,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      className={
        cls.block + (props.className === undefined ? '' : ` ${props.className}`)
      }
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '110vw',
        overflow: 'hidden',
      }}
      id={props.id}
      initial={{
        height: 0,
        marginBottom: 0,
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
