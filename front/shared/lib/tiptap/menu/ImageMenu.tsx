import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { type JSX, useRef } from 'react'
import { AlignButtons } from './button/AlignButtons'
import { liquidGlassStyle } from '../style/liquidGlassStyle'
import { useTiptap } from '../provider/TiptapProvider'

type Props = {
  editor: Editor
}

export const ImageMenu = (props: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null)

  const = useTiptap()

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
      shouldShow={(ctx) => {
        if (ctx.editor.isDestroyed === true) {
          return false
        }

        return ctx.editor.isActive('image')
      }}
      getReferencedVirtualElement={() => {
        //* Issue: menu is not centered in the middle of the image
        if (props.editor.isDestroyed === true) {
          return null
        }

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
      options={{
        onShow: (): void => {
          //* Issue: for row cells menu is randomly positioned
          requestAnimationFrame(() => {
            props.editor.view.dispatch(
              props.editor.state.tr.setMeta('bubbleMenu', 'updatePosition'),
            )
          })
        },
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
        <AlignButtons editor={props.editor} />
      </div>
    </BubbleMenu>
  )
}
