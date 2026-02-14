import { Box, Tooltip } from '@mui/material'
import { useRef } from 'react'
import { RiAttachmentLine } from 'react-icons/ri'
import { useTiptap } from '../provider/TiptapProvider'

export const UploadButton = (): React.ReactNode => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const ctx = useTiptap()

  if (ctx.onUpload === undefined) {
    return null
  }

  return (
    <>
      <Box
        className='tiptap-upload-button'
        title='Upload file'
        onClick={() => {
          fileInputRef.current?.click()
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
          title='Upload file'
        >
          <RiAttachmentLine size={14} />
        </Tooltip>
      </Box>
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={(event) => {
          const { files } = event.target

          const hasFiles = files !== null && files.length > 0

          if (hasFiles === false) {
            return
          }

          const [file] = files

          if (file === undefined) {
            return
          }

          void ctx.onUpload?.({
            editor: ctx.editorRef.current,
            files: Array.from(files),
            type: file.type.startsWith('image/') ? 'image' : 'file',
          })

          event.target.value = ''
        }}
      />
    </>
  )
}
