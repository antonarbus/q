import { Box, Popover, Tooltip } from '@mui/material'
import { useRef, useState } from 'react'
import { useTiptap } from '@tiptap/react'
import { useTiptapCtx } from '../../provider/TiptapProvider'
import { InsertTableButton } from './InsertTableButton'
import { InsertLinkButton } from './InsertLinkButton'
import { UploadFileButton } from './UploadFileButton'
import { YouTubeButton } from './YouTubeButton'
import { cls } from '@shared/cls'
import { IoAddCircleOutline } from 'react-icons/io5'

export const InsertButton = (): React.ReactNode => {
  const { editor } = useTiptap()
  const tiptapCtx = useTiptapCtx()
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  if (tiptapCtx.onUpload === undefined) {
    return null
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Box
        ref={anchorRef}
        className={cls.tiptapInsertButton}
        onClick={() => {
          setOpen(true)
        }}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          transition: 'opacity 0.2s ease-in-out',
          userSelect: 'none',
          cursor: 'pointer',
          color: '#aaa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: 4,
          ':hover': {
            color: 'black',
          },
        }}
      >
        <Tooltip
          enterDelay={500}
          enterNextDelay={500}
          placement='top'
          title='Insert'
        >
          <IoAddCircleOutline size={14} />
        </Tooltip>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              display: 'flex',
              gap: '2px',
              padding: '6px 8px',
              borderRadius: '8px',
            },
          },
        }}
      >
        <InsertLinkButton editor={editor} onDone={handleClose} />
        <InsertTableButton editor={editor} onDone={handleClose} />
        <YouTubeButton editor={editor} onDone={handleClose} />
        <UploadFileButton editor={editor} onDone={handleClose} />
      </Popover>
    </>
  )
}
