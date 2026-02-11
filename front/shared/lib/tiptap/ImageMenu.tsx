import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import { type JSX, useCallback, useRef } from 'react'
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from 'react-icons/ri'
import { liquidGlassStyle } from './liquidGlassStyle'
import { useAlignment } from './useAlignment'

type Props = {
  editor: Editor
}

export const ImageMenu = (props: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const alignment = useAlignment({ editor: props.editor })
  const editorRef = useRef(props.editor)
  editorRef.current = props.editor

  // Must be memoized: BubbleMenu's React wrapper uses a hardcoded "bubbleMenu"
  // meta key shared by ALL BubbleMenu instances on the same editor (including FloatingMenu).
  // An inline function here would create a new reference every render, triggering a
  // meta transaction that overwrites OTHER BubbleMenu instances' shouldShow callbacks.
  const shouldShow = useCallback((ctx: { editor: Editor }): boolean => {
    if (ctx.editor.isDestroyed === true) {
      return false
    }

    return ctx.editor.isActive('image')
  }, [])

  // Same reason as shouldShow above — must be memoized to avoid meta key collision.
  const getReferencedVirtualElement = useCallback(() => {
    const editor = editorRef.current

    if (editor.isDestroyed === true) {
      return null
    }

    const node = editor.view.nodeDOM(editor.state.selection.from)

    if (node instanceof HTMLElement) {
      const img = node.querySelector('img')

      if (img !== null) {
        return img
      }
    }

    return null
  }, [])

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={props.editor}
      updateDelay={0}
      shouldShow={shouldShow}
      getReferencedVirtualElement={getReferencedVirtualElement}
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
