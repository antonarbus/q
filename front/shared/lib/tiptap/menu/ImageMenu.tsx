import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { type JSX, useCallback, useMemo, useRef } from 'react'
import { AlignButtons } from './button/AlignButtons'
import { liquidGlassStyle } from '../style/liquidGlassStyle'

type Props = {
  editor: Editor
}

export const ImageMenu = (props: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null)

  //* Issue: menu for some nodes stopped showing and after never showed again for this editor
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
    if (props.editor.isDestroyed === true) {
      return null
    }

    const node = props.editor.view.nodeDOM(props.editor.state.selection.from)

    if (node instanceof HTMLElement) {
      const img = node.querySelector('img')

      if (img !== null) {
        return img
      }
    }

    return null
  }, [])

  //* Issue: for row cells menu is randomly positioned
  // Same onShow fix as FloatingMenu — force re-position after DOM append.
  const options = useMemo(
    () => ({
      onShow: (): void => {
        requestAnimationFrame(() => {
          props.editor.view.dispatch(
            props.editor.state.tr.setMeta('bubbleMenu', 'updatePosition'),
          )
        })
      },
    }),
    [],
  )

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={props.editor}
      updateDelay={200}
      shouldShow={shouldShow}
      getReferencedVirtualElement={getReferencedVirtualElement}
      options={options}
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
        <AlignButtons editor={props.editor} />
      </div>
    </BubbleMenu>
  )
}
