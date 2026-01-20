import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import type { JSX } from 'react'
import { Divider } from './Divider'

type Props = {
  editor: Editor
}

export const FloatingMenu = (props: Props): JSX.Element => {
  return (
    <BubbleMenu editor={props.editor}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          backgroundColor: '#1f2937',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <MenuButton
          onClick={() => props.editor.chain().focus().toggleBold().run()}
          isActive={props.editor.isActive('bold')}
          title='Bold'
        >
          B
        </MenuButton>
        <MenuButton
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
          isActive={props.editor.isActive('italic')}
          title='Italic'
        >
          <em>I</em>
        </MenuButton>
        <MenuButton
          onClick={() => props.editor.chain().focus().toggleUnderline().run()}
          isActive={props.editor.isActive('underline')}
          title='Underline'
        >
          <u>U</u>
        </MenuButton>
        <MenuButton
          onClick={() => props.editor.chain().focus().toggleStrike().run()}
          isActive={props.editor.isActive('strike')}
          title='Strikethrough'
        >
          <s>S</s>
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() =>
            props.editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={props.editor.isActive('heading', { level: 2 })}
          title='Heading'
        >
          H
        </MenuButton>
        <MenuButton
          onClick={() => props.editor.chain().focus().toggleBulletList().run()}
          isActive={props.editor.isActive('bulletList')}
          title='Bullet List'
        >
          •
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => props.editor.chain().focus().setColor('#ef4444').run()}
          isActive={props.editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
        >
          <span style={{ color: '#ef4444' }}>A</span>
        </MenuButton>
        <MenuButton
          onClick={() =>
            props.editor
              .chain()
              .focus()
              .toggleHighlight({ color: '#fef08a' })
              .run()
          }
          isActive={props.editor.isActive('highlight')}
          title='Highlight'
        >
          <span style={{ backgroundColor: '#fef08a', padding: '0 2px' }}>
            H
          </span>
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
