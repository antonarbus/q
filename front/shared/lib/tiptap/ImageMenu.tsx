import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import type { JSX } from 'react'
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from 'react-icons/ri'
import { liquidGlassStyle } from './liquidGlassStyle'
import { useAlignment } from './useAlignment'

type Props = {
  editor: Editor
}

export const ImageMenu = (props: Props): JSX.Element => {
  const alignment = useAlignment({ editor: props.editor })

  return (
    <BubbleMenu
      editor={props.editor}
      shouldShow={({ editor }) => editor.isActive('image')}
      updateDelay={0}
      tippyOptions={{
        duration: 100,
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
      </div>
    </BubbleMenu>
  )
}
