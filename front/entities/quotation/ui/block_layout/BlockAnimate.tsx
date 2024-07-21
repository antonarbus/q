import { theme } from '@lib_instances/theme'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import type { ResizableProps } from 're-resizable'
import type { ReactNode } from 'react'
import { cls } from '@shared/consts/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/types/resizablePaper'
import { ResizableBlockPaper } from './ResizableBlockPaper'

type Props = {
  children: ReactNode
  blockHeight: number
  id: string
  leftItemActionButtons?: ReactNode
  rightItemActionButtons?: ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
  className?: string
}

export const BlockAnimate = ({
  children,
  blockHeight,
  id,
  leftItemActionButtons,
  rightItemActionButtons,
  disableResize,
  autoWidth,
  minWidth,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  className,
}: Props): JSX.Element => {
  return (
    <motion.div
      id={id}
      className={cls.block + (className ? ` ${className}` : '')}
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      animate={{
        height: blockHeight, // height is being stored on copy/cut icon click
        marginBottom: 20,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '110vw',
        overflow: 'hidden',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      {leftItemActionButtons && (
        <Box style={{ paddingTop: '5px' }}>{leftItemActionButtons}</Box>
      )}
      <ResizableBlockPaper
        disableResize={disableResize}
        autoWidth={autoWidth}
        onItemResizeStart={onItemResizeStart}
        onItemResize={onItemResize}
        onItemResizeStop={onItemResizeStop}
        minWidth={minWidth}
      >
        {children}
      </ResizableBlockPaper>
      {rightItemActionButtons && (
        <Box style={{ paddingTop: '5px' }}>{rightItemActionButtons}</Box>
      )}
    </motion.div>
  )
}
