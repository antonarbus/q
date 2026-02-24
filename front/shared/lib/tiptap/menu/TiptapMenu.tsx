import { BubbleMenu } from '@tiptap/react/menus'
import { useRef, useCallback } from 'react'
import { useTiptap, useTiptapState } from '@tiptap/react'
import { ImageMenu } from './ImageMenu'
import { TextMenu } from './TextMenu'
import { TableMenu } from './TableMenu'
import { TiptapMenuLayout } from '../style/TiptapMenuLayout'

export const TiptapMenu = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { editor } = useTiptap()

  const isImageActive = useTiptapState((ctx) => ctx.editor.isActive('image'))
  const isTableActive = useTiptapState((ctx) => ctx.editor.isActive('table'))

  const shouldShow = useCallback((ctx: { editor: typeof editor }) => {
    if (ctx.editor.isDestroyed === true) return false
    if (ctx.editor.isActive('table')) return true
    if (ctx.editor.state.selection.empty === true) return false

    return true
  }, [])

  const getReferencedVirtualElement = useCallback(() => {
    //* Issue: menu is not centered in the middle of the image
    if (editor.isDestroyed === true) return null

    const node = editor.view.nodeDOM(editor.state.selection.from)

    if (node instanceof HTMLElement) {
      const img = node.querySelector('img')
      if (img !== null) return img
    }

    return null
  }, [editor])

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={editor}
      updateDelay={isImageActive === true ? 0 : 250}
      shouldShow={shouldShow}
      getReferencedVirtualElement={getReferencedVirtualElement}
      options={{
        onShow: (): void => {
          //* Issue: for row cells menu is randomly positioned
          requestAnimationFrame(() => {
            editor.view.dispatch(
              editor.state.tr.setMeta('bubbleMenu', 'updatePosition'),
            )
          })
        },
      }}
    >
      <TiptapMenuLayout>
        {isImageActive === true && <ImageMenu />}
        {isTableActive === true && <TableMenu />}
        {isImageActive === false && isTableActive === false && <TextMenu />}
      </TiptapMenuLayout>
    </BubbleMenu>
  )
}
