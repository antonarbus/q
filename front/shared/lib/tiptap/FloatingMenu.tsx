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
      shouldShow={(ctx): boolean => {
        // ImageMenu is shown for image actions
        if (ctx.editor.isActive('image') === true) {
          return false
        }

        const toBeShown = ctx.editor.state.selection.content().size > 0

        return toBeShown
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
          isActive={props.editor.isActive('bold')}
          title='Bold'
          onClick={() => {
            props.editor.chain().focus().toggleBold().run()
          }}
        >
          <RiBold size={16} />
        </MenuButton>
        <MenuButton
          isActive={props.editor.isActive('italic')}
          title='Italic'
          onClick={() => {
            props.editor.chain().focus().toggleItalic().run()
          }}
        >
          <RiItalic size={16} />
        </MenuButton>
        <MenuButton
          isActive={props.editor.isActive('underline')}
          title='Underline'
          onClick={() => {
            props.editor.chain().focus().toggleUnderline().run()
          }}
        >
          <RiUnderline size={16} />
        </MenuButton>
        <MenuButton
          isActive={props.editor.isActive('strike')}
          title='Strikethrough'
          onClick={() => {
            props.editor.chain().focus().toggleStrike().run()
          }}
        >
          <RiStrikethrough size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          isActive={props.editor.isActive('heading', { level: 2 })}
          title='Heading'
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
        >
          <RiH2 size={16} />
        </MenuButton>
        <MenuButton
          isActive={props.editor.isActive('bulletList')}
          title='Bullet List'
          onClick={() => {
            props.editor.chain().focus().toggleBulletList().run()
          }}
        >
          <RiListUnordered size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          isActive={alignment === 'left'}
          title='Align left'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('left').run()
          }}
        >
          <RiAlignLeft size={16} />
        </MenuButton>
        <MenuButton
          isActive={alignment === 'center'}
          title='Align center'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('center').run()
          }}
        >
          <RiAlignCenter size={16} />
        </MenuButton>
        <MenuButton
          isActive={alignment === 'right'}
          title='Align right'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('right').run()
          }}
        >
          <RiAlignRight size={16} />
        </MenuButton>

        <Divider />

        <MenuButton
          isActive={props.editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
          onClick={() => {
            props.editor.chain().focus().setColor('#ef4444').run()
          }}
        >
          <RiFontColor size={16} color='#ef4444' />
        </MenuButton>
        <MenuButton
          isActive={props.editor.isActive('highlight')}
          title='Highlight'
          onClick={() => {
            props.editor
              .chain()
              .focus()
              .toggleHighlight({ color: '#fef08a' })
              .run()
          }}
        >
          <RiMarkPenLine size={16} color='#fef08a' />
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
