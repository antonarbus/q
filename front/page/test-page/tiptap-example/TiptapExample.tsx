import type { JSX, ReactNode } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const menuStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '6px 8px',
  backgroundColor: '#1f2937',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
}

const editorWrapperStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: 16,
  minHeight: 200,
}

type MenuButtonProps = {
  onClick: () => void
  isActive: boolean
  title: string
  children: ReactNode
}

const MenuButton = ({ onClick, isActive, title, children }: MenuButtonProps): JSX.Element => (
  <button
    type='button'
    onClick={onClick}
    title={title}
    style={{
      padding: '4px 8px',
      border: 'none',
      borderRadius: 4,
      backgroundColor: isActive === true ? '#4b5563' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: isActive === true ? 600 : 400,
      minWidth: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </button>
)

const Divider = (): JSX.Element => (
  <div
    style={{
      width: 1,
      height: 20,
      backgroundColor: '#4b5563',
      margin: '0 4px',
    }}
  />
)

export const TiptapExample = (): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: 'Start typing...' }),
    ],
    content: `
      <h2>Tiptap Editor</h2>
      <p>This is <strong>Tiptap</strong> - built on <em>ProseMirror</em>.</p>
      <ul>
        <li>Native HTML support</li>
        <li>Lightweight (~50KB)</li>
        <li>Great TypeScript</li>
      </ul>
    `,
  })

  if (editor === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BubbleMenu editor={editor}>
        <div style={menuStyle}>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title='Bold'
          >
            B
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title='Italic'
          >
            <em>I</em>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title='Underline'
          >
            <u>U</u>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title='Strikethrough'
          >
            <s>S</s>
          </MenuButton>

          <Divider />

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title='Heading'
          >
            H
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title='Bullet List'
          >
            •
          </MenuButton>

          <Divider />

          <MenuButton
            onClick={() => editor.chain().focus().setColor('#ef4444').run()}
            isActive={editor.isActive('textStyle', { color: '#ef4444' })}
            title='Red'
          >
            <span style={{ color: '#ef4444' }}>A</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            isActive={editor.isActive('highlight')}
            title='Highlight'
          >
            <span style={{ backgroundColor: '#fef08a', padding: '0 2px' }}>H</span>
          </MenuButton>
        </div>
      </BubbleMenu>

      <div style={editorWrapperStyle}>
        <EditorContent editor={editor} />
      </div>

      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer', color: '#666', fontSize: 12 }}>View HTML</summary>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 11, overflow: 'auto' }}>
          {editor.getHTML()}
        </pre>
      </details>
    </div>
  )
}
