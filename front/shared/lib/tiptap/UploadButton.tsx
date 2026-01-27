import { type JSX, useRef } from 'react'

type Props = {
  onFileSelect: (files: File[], type: 'image' | 'file') => void
}

export const UploadButton = (props: Props): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <div
        className='tiptap-upload-button'
        onClick={() => {
          fileInputRef.current?.click()
        }}
        style={{
          position: 'absolute',
          top: 2,
          right: 5,
          transition: 'opacity 0.3s ease-in-out 0.8s',
          fontSize: 8,
          userSelect: 'none',
          zIndex: 10,
          cursor: 'pointer',
          color: '#999',
        }}
      >
        Upload file
      </div>
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
