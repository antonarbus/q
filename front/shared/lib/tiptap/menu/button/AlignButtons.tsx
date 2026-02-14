import { MenuButton } from './MenuButton'
import { useTiptap, useTiptapState } from '@tiptap/react'
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from 'react-icons/ri'

type Alignment = 'left' | 'center' | 'right'

export const AlignButtons = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const alignment = useTiptapState((ctx): Alignment => {
    if (ctx.editor.isActive({ textAlign: 'center' })) {
      return 'center'
    }

    if (ctx.editor.isActive({ textAlign: 'right' })) {
      return 'right'
    }

    return 'left'
  })

  return (
    <>
      <MenuButton
        isActive={alignment === 'left'}
        title='Align left'
        onClick={() => {
          editor.chain().focus().setTextAlign('left').run()
        }}
      >
        <RiAlignLeft size={16} />
      </MenuButton>

      <MenuButton
        isActive={alignment === 'center'}
        title='Align center'
        onClick={() => {
          editor.chain().focus().setTextAlign('center').run()
        }}
      >
        <RiAlignCenter size={16} />
      </MenuButton>

      <MenuButton
        isActive={alignment === 'right'}
        title='Align right'
        onClick={() => {
          editor.chain().focus().setTextAlign('right').run()
        }}
      >
        <RiAlignRight size={16} />
      </MenuButton>
    </>
  )
}
