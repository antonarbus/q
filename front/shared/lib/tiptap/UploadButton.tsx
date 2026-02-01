import { Box } from '@mui/material'
import { type JSX, useRef } from 'react'
import { RiAttachmentLine } from 'react-icons/ri'

type Props = {
  onFileSelect: (files: File[], type: 'image' | 'file') => void
}

export const UploadButton = (props: Props): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
        <RiAttachmentLine size={14} />
      </Box>
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={(event) => {
          const { files } = event.target

          if (files === null || files.length === 0) {
            return
          }

          const [file] = files

          if (file === undefined) {
            return
          }

          const type = file.type.startsWith('image/') ? 'image' : 'file'

          props.onFileSelect(Array.from(files), type)

          event.target.value = ''
        }}
      />
    </>
  )
}
