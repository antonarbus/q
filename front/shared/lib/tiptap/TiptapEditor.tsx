/* eslint-disable react/jsx-handler-names */
import { DropHereText } from './file-upload/DropHereText'
import { tiptapStyles } from './style/tiptapStyles'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Tiptap, useEditor } from '@tiptap/react'
import { TiptapMenu } from './menu/TiptapMenu'
import { useExtensions } from './extension/useExtensions'
import { cls } from '@shared/cls'
import { useDropFile } from './file-upload/useDropFile'
import { usePasteFile } from './file-upload/usePasteFile'
import { useTiptapCtx } from './provider/TiptapProvider'
import { UploadButton } from './menu/button/UploadButton'
import { editorRegistry } from './editorRegistry'

export const TiptapEditor = (): React.ReactNode => {
  const tiptapCtx = useTiptapCtx()
  const extensions = useExtensions()
  const dropFile = useDropFile()
  const pasteFile = usePasteFile()

  // https://tiptap.dev/docs/guides/react-composable-api
  const editor = useEditor(
    {
      extensions,
      content: tiptapCtx.contentGetter(),
      onCreate: tiptapCtx.onCreate,
      onUpdate: tiptapCtx.onChange,
      onBlur: tiptapCtx.onFocusOut,
      editorProps: {
        attributes: {
          class: cls.tiptapEditor,
        },
        handleKeyDown: (view, event) => {
          if (tiptapCtx.onKeyDown !== undefined) {
            return tiptapCtx.onKeyDown(view, event)
          }

          return false
        },
        handleDrop: (_view, event, _slice, moved) => {
          return dropFile(_view, event, _slice, moved)
        },
        handlePaste: (_view, event) => {
          return pasteFile(_view, event)
        },
      },
    },
    [],
  )

  useEffect(() => {
    editorRegistry.set(tiptapCtx.registryKey, editor)

    return (): void => {
      editorRegistry.delete(tiptapCtx.registryKey, editor)
    }
  }, [editor, tiptapCtx.registryKey])

  return (
    <Box
      className={`${tiptapCtx.className} ${tiptapCtx.onUpload === undefined ? '' : cls.droppable}`}
      onClick={tiptapCtx.onWrapperClick}
      onFocus={tiptapCtx.onWrapperFocus}
      sx={{ position: 'relative', ...tiptapStyles, ...tiptapCtx.sx }}
    >
      <Tiptap editor={editor}>
        <TiptapMenu />
        <UploadButton />
        <Tiptap.Content className={cls.tiptapContent} style={{ flexGrow: 1 }} />
      </Tiptap>
      <DropHereText />
    </Box>
  )
}
