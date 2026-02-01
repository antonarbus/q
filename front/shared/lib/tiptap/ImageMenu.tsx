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
      updateDelay={0}
      shouldShow={(ctx): boolean => {
        return ctx.editor.isActive('image')
      }}
      getReferencedVirtualElement={() => {
        const node = props.editor.view.nodeDOM(
          props.editor.state.selection.from,
        )

        if (node instanceof HTMLElement) {
          const img = node.querySelector('img')

          if (img !== null) {
            return img
          }
        }

        return null
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
      </div>
    </BubbleMenu>
  )
}
