import { FloatingMenu } from '@tiptap/react/menus'
import { useTiptap } from '@tiptap/react'
import { useCallback, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { MenuButton } from './button/shared/MenuButton'
import { liquidGlassStyle } from '../style/liquidGlassStyle'
import { useTiptapCtx } from '../provider/TiptapProvider'
import {
  RiTableLine,
  RiLink,
  RiUploadLine,
  RiYoutubeLine,
} from 'react-icons/ri'

export const MenuForEmptyLine = (): React.ReactNode => {
  const { editor } = useTiptap()
  const tiptapCtx = useTiptapCtx()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [activeInput, setActiveInput] = useState<'link' | 'youtube' | null>(
    null,
  )

  const [inputValue, setInputValue] = useState('')

  const shouldShow = useCallback(
    (ctx: {
      editor: {
        isActive: (name: string) => boolean
        isFocused: boolean
      }
      state: {
        selection: {
          $from: { parent: { isTextblock: boolean; textContent: string } }
        }
      }
    }) => {
      if (!ctx.editor.isFocused) {
        return false
      }

      if (ctx.editor.isActive('codeBlock')) {
        return false
      }

      if (ctx.editor.isActive('table')) {
        return false
      }

      const { $from } = ctx.state.selection

      const isEmptyTextBlock =
        $from.parent.isTextblock && $from.parent.textContent === ''

      return isEmptyTextBlock
    },
    [],
  )

  const handleInsertTable = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()
  }, [editor])

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      if (files === null || files.length === 0) return

      if (tiptapCtx.onUpload !== undefined) {
        const fileArray = Array.from(files)

        const hasImage = fileArray.some((file) =>
          file.type.startsWith('image/'),
        )

        void tiptapCtx.onUpload({
          editor,
          type: hasImage === true ? 'image' : 'file',
          files: fileArray,
        })
      }

      // Reset input so the same file can be selected again
      event.target.value = ''
    },
    [editor, tiptapCtx],
  )

  const handleSubmitInput = useCallback(() => {
    if (inputValue.trim() === '') {
      setActiveInput(null)
      setInputValue('')

      return
    }

    if (activeInput === 'link') {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: inputValue,
          marks: [{ type: 'link', attrs: { href: inputValue } }],
        })
        .run()
    }

    if (activeInput === 'youtube') {
      editor.commands.setYoutubeVideo({ src: inputValue })
    }

    setActiveInput(null)
    setInputValue('')
  }, [activeInput, inputValue, editor])

  if (activeInput !== null) {
    return (
      <FloatingMenu
        editor={editor}
        shouldShow={shouldShow}
        options={{ placement: 'left', offset: 40 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 8px',
            ...liquidGlassStyle,
          }}
        >
          <input
            type='text'
            placeholder={
              activeInput === 'link' ? 'https://...' : 'YouTube URL...'
            }
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSubmitInput()

              if (event.key === 'Escape') {
                setActiveInput(null)
                setInputValue('')
                editor.commands.focus()
              }
            }}
            style={{
              padding: '2px 6px',
              fontSize: 13,
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 4,
              background: 'rgba(0,0,0,0.2)',
              color: 'inherit',
              outline: 'none',
              width: 200,
            }}
            autoFocus
          />
          <MenuButton
            isActive={false}
            title='Insert'
            onClick={handleSubmitInput}
          >
            {activeInput === 'link' ? <RiLink /> : <RiYoutubeLine />}
          </MenuButton>
        </Box>
      </FloatingMenu>
    )
  }

  return (
    <>
      <FloatingMenu
        editor={editor}
        shouldShow={shouldShow}
        options={{ placement: 'left', offset: 40 }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '2px',
            padding: '6px 8px',
            ...liquidGlassStyle,
          }}
        >
          <MenuButton
            isActive={false}
            title='Insert table'
            onClick={handleInsertTable}
          >
            <RiTableLine />
          </MenuButton>
          <MenuButton
            isActive={false}
            title='Insert link'
            onClick={() => {
              setActiveInput('link')
              setInputValue('')
            }}
          >
            <RiLink />
          </MenuButton>
          <MenuButton
            isActive={false}
            title='Upload file'
            onClick={handleUploadClick}
          >
            <RiUploadLine />
          </MenuButton>
          <MenuButton
            isActive={false}
            title='YouTube video'
            onClick={() => {
              setActiveInput('youtube')
              setInputValue('')
            }}
          >
            <RiYoutubeLine />
          </MenuButton>
        </Box>
      </FloatingMenu>

      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </>
  )
}
