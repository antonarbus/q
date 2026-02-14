import type { JSX } from 'react'
import { MenuButton } from './MenuButton'
import { type Editor, useEditorState } from '@tiptap/react'
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from 'react-icons/ri'

type Alignment = 'left' | 'center' | 'right'

type Props = {
  editor: Editor
}

export const AlignButtons = (props: Props): JSX.Element => {
  const alignment = useEditorState({
    editor: props.editor,
    selector: (ctx): Alignment => {
      if (ctx.editor.isActive({ textAlign: 'center' })) {
        return 'center'
      }

      if (ctx.editor.isActive({ textAlign: 'right' })) {
        return 'right'
      }

      return 'left'
    },
  })

  return (
    <>
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
    </>
  )
}
