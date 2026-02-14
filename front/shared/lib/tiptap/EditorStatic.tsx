import { Box } from '@mui/material'
import { useEditor, EditorContent } from '@tiptap/react'
import { useExtensions } from './extension/useExtensions'
import { tiptapStyles } from './style/tiptapStyles'
import { cls } from '@shared/cls'
import { useTiptap } from './provider/TiptapProvider'

export const EditorStatic = (): React.ReactNode => {
  const ctx = useTiptap()
  const extensions = useExtensions()

  const editor = useEditor(
    {
      extensions,
      content: ctx.content,
      editable: false,
    },
    [ctx.content],
  )

  if (ctx.isEditorActive === true) {
    return null
  }

  return (
    <Box
      className={`${cls.notEditable} ${ctx.className}`}
      sx={{
        opacity: 0.5,
        ...tiptapStyles,
        ...ctx.sx,
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
