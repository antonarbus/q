/* eslint-disable react/jsx-handler-names */
import { TiptapEditor } from './TiptapEditor'
import { UploadButton } from './file-upload/UploadButton'
import { DropHereText } from './file-upload/DropHereText'
import { tiptapStyles } from './style/tiptapStyles'
import { Box } from '@mui/material'
import { useTiptap } from './provider/TiptapProvider'
import { cls } from '@shared/cls'

export const EditorNotStatic = (): React.ReactNode => {
  const ctx = useTiptap()

  if (ctx.isEditorActive === false) {
    return null
  }

  return (
    <Box
      className={`${ctx.className} ${ctx.onUpload === undefined ? '' : cls.droppable}`}
      onClick={ctx.onWrapperClick}
      onFocus={ctx.onWrapperFocus}
      sx={{ position: 'relative', ...tiptapStyles, ...ctx.sx }}
    >
      <UploadButton />
      <TiptapEditor />
      <DropHereText />
    </Box>
  )
}
