import { Box } from '@mui/material'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExtensions } from './extension/useExtensions'
import { tiptapStyles } from './style/tiptapStyles'
import { cls } from '@shared/cls'
import { useTiptapCtx } from './provider/TiptapProvider'

export const EditorStatic = (): React.ReactNode => {
  const tiptapCtx = useTiptapCtx()
  const extensions = useExtensions()

  const editor = useEditor(
    {
      extensions,
      content: tiptapCtx.content,
      editable: false,
    },
    [tiptapCtx.content],
  )

  if (tiptapCtx.isEditorActive === true) {
    return null
  }

  return (
    <Box
      className={`${cls.notEditable} ${tiptapCtx.className}`}
      sx={{
        opacity: 0.5,
        ...tiptapStyles,
        ...tiptapCtx.sx,
      }}
    >
      <EditorContent
        editor={editor}
        style={{
          flexGrow: 1,
        }}
      />
    </Box>
  )
}
