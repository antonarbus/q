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
    <BubbleMenu
      editor={props.editor}
      shouldShow={({ editor }) => {
        if (editor.isActive('image') === true) return false

        return editor.state.selection.content().size > 0
      }}
    >
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
          onClick={() => {
            props.editor.chain().focus().toggleBold().run()
          }}
          isActive={props.editor.isActive('bold')}
          title='Bold'
        >
          B
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleItalic().run()
          }}
          isActive={props.editor.isActive('italic')}
          title='Italic'
        >
          <em>I</em>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleUnderline().run()
          }}
          isActive={props.editor.isActive('underline')}
          title='Underline'
        >
          <u>U</u>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleStrike().run()
          }}
          isActive={props.editor.isActive('strike')}
          title='Strikethrough'
        >
          <s>S</s>
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          isActive={props.editor.isActive('heading', { level: 2 })}
          title='Heading'
        >
          H
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleBulletList().run()
          }}
          isActive={props.editor.isActive('bulletList')}
          title='Bullet List'
        >
          •
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('left').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'left' })}
          title='Align left'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='17' y1='10' x2='3' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='17' y1='18' x2='3' y2='18' />
          </svg>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('center').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'center' })}
          title='Align center'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='18' y1='10' x2='6' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='18' y1='18' x2='6' y2='18' />
          </svg>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('right').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'right' })}
          title='Align right'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='21' y1='10' x2='7' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='21' y1='18' x2='7' y2='18' />
          </svg>
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setColor('#ef4444').run()
          }}
          isActive={props.editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
        >
          <span style={{ color: '#ef4444' }}>A</span>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor
              .chain()
              .focus()
              .toggleHighlight({ color: '#fef08a' })
              .run()
          }}
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
