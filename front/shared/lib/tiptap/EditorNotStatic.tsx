/* eslint-disable react/jsx-handler-names */
import { TiptapEditor } from './TiptapEditor'
import { DropHereText } from './file-upload/DropHereText'
import { tiptapStyles } from './style/tiptapStyles'
import { Box } from '@mui/material'
import { useTiptapCtx } from './provider/TiptapProvider'
import { cls } from '@shared/cls'

export const EditorNotStatic = (): React.ReactNode => {
  const tiptapCtx = useTiptapCtx()

  if (tiptapCtx.isEditorActive === false) {
    return null
  }

  return (
    <Box
      className={`${tiptapCtx.className} ${tiptapCtx.onUpload === undefined ? '' : cls.droppable}`}
      onClick={tiptapCtx.onWrapperClick}
      onFocus={tiptapCtx.onWrapperFocus}
      sx={{ position: 'relative', ...tiptapStyles, ...tiptapCtx.sx }}
    >
      <TiptapEditor />
      <DropHereText />
    </Box>
  )
}
