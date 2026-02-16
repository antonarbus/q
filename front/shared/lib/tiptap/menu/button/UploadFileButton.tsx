import type { Editor } from '@tiptap/react'
import { useRef } from 'react'
import { MenuButton } from './shared/MenuButton'
import { RiUploadLine } from 'react-icons/ri'
import { useTiptapCtx } from '../../provider/TiptapProvider'

type Props = {
  editor: Editor
  onDone?: () => void
}

export const UploadFileButton = (props: Props): React.JSX.Element => {
  const tiptapCtx = useTiptapCtx()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <MenuButton
        isActive={false}
        title='Upload file'
        onClick={() => {
          fileInputRef.current?.click()
        }}
      >
        <RiUploadLine />
      </MenuButton>
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={(event) => {
          const { files } = event.target
          const hasFiles = files !== null && files.length > 0

          if (hasFiles === false) return

          const { onUpload } = tiptapCtx

          if (onUpload !== undefined) {
            const fileArray = Array.from(files)

            const hasImage = fileArray.some((file) =>
              file.type.startsWith('image/'),
            )

            void onUpload({
              editor: props.editor,
              type: hasImage === true ? 'image' : 'file',
              files: fileArray,
            })
          }

          event.target.value = ''
          props.onDone?.()
        }}
        multiple
      />
    </>
  )
}
