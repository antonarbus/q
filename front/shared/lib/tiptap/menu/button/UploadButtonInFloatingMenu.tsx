import { useRef } from 'react'
import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { TbUpload } from 'react-icons/tb'
import { useTiptapCtx } from '../../provider/useTiptapCtx'

export const UploadButtonInFloatingMenu = (): React.JSX.Element | null => {
  const { editor } = useTiptap()
  const tiptapCtx = useTiptapCtx()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (tiptapCtx.onUpload === undefined) {
    return null
  }

  return (
    <>
      <MenuButton
        isActive={false}
        title='Upload'
        skipBlurFocus
        onClick={() => {
          fileInputRef.current?.click()
        }}
      >
        <TbUpload />
      </MenuButton>
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
