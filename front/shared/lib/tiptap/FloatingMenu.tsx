import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import type { JSX } from 'react'
import { Divider } from './Divider'
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiH2,
  RiListUnordered,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiFontColor,
  RiMarkPenLine,
} from 'react-icons/ri'
import { liquidGlassStyle } from './liquidGlassStyle'
import { useAlignment } from './useAlignment'

type Props = {
  editor: Editor
}

export const FloatingMenu = (props: Props): JSX.Element => {
  const alignment = useAlignment({ editor: props.editor })

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
          ...liquidGlassStyle,
        }}
      >
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleBold().run()
          }}
          isActive={props.editor.isActive('bold')}
          title='Bold'
        >
          <RiBold size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleItalic().run()
          }}
          isActive={props.editor.isActive('italic')}
          title='Italic'
        >
          <RiItalic size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleUnderline().run()
          }}
          isActive={props.editor.isActive('underline')}
          title='Underline'
        >
          <RiUnderline size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleStrike().run()
          }}
          isActive={props.editor.isActive('strike')}
          title='Strikethrough'
        >
          <RiStrikethrough size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          isActive={props.editor.isActive('heading', { level: 2 })}
          title='Heading'
        >
          <RiH2 size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().toggleBulletList().run()
          }}
          isActive={props.editor.isActive('bulletList')}
          title='Bullet List'
        >
          <RiListUnordered size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('left').run()
          }}
          isActive={alignment.isActive('left')}
          title='Align left'
        >
          <RiAlignLeft size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('center').run()
          }}
          isActive={alignment.isActive('center')}
          title='Align center'
        >
          <RiAlignCenter size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('right').run()
          }}
          isActive={alignment.isActive('right')}
          title='Align right'
        >
          <RiAlignRight size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setColor('#ef4444').run()
          }}
          isActive={props.editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
        >
          <RiFontColor size={16} color='#ef4444' />
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
          <RiMarkPenLine size={16} color='#fef08a' />
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
