// oxlint-disable jsx-a11y/control-has-associated-label
import { Box, Tooltip } from '@mui/material'
import { useRef } from 'react'
import { useTiptap } from '@tiptap/react'
import { useTiptapCtx } from '../../provider/useTiptapCtx'
import { TbUpload } from 'react-icons/tb'

export const UploadButton = (): React.ReactNode => {
  const { editor } = useTiptap()
  const tiptapCtx = useTiptapCtx()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (tiptapCtx.onUpload === undefined) {
    return null
  }

  return (
    <>
      <Box
        onClick={() => {
          fileInputRef.current?.click()
        }}
        sx={{
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
        <Tooltip enterDelay={500} enterNextDelay={500} placement='top' title='Upload'>
          <TbUpload size={14} />
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

          const { onUpload } = tiptapCtx

          if (onUpload !== undefined) {
            const fileArray = [...files]

            const hasImage = fileArray.some((file) => file.type.startsWith('image/'))

            onUpload({
              editor,
              type: hasImage === true ? 'image' : 'file',
              files: fileArray,
            })
          }

          event.target.value = ''
        }}
      />
    </>
  )
}
