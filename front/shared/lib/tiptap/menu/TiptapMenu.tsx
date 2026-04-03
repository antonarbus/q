import { BubbleMenu } from '@tiptap/react/menus'
import { useRef, useCallback, useEffect } from 'react'
import { useTiptap, useTiptapState } from '@tiptap/react'
import { ImageMenu } from './ImageMenu'
import { TextMenu } from './TextMenu'
import { TableMenu } from './TableMenu'
import { FloatingLineMenu } from './FloatingLineMenu'
import { TiptapMenuLayout } from '../style/TiptapMenuLayout'

export const TiptapMenu = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { editor } = useTiptap()

  const isImageActive = useTiptapState((ctx) => ctx.editor.isActive('image'))
  const isInTable = useTiptapState((ctx) => ctx.editor.isActive('table'))

  // CellSelection ($anchorCell exists) = multi-cell drag; plain TextSelection inside a cell = user selected text
  const hasTextSelection = useTiptapState((ctx) => {
    const { selection } = ctx.editor.state

    if (selection.empty) {
      return false
    }

    const isCellSelection = '$anchorCell' in selection
    const isCellNotSelected = isCellSelection === false

    return isCellNotSelected
  })

  const shouldShow = useCallback((ctx: { editor: typeof editor }) => {
    if (ctx.editor.isDestroyed === true) {
      return false
    }

    if (ctx.editor.isEditable === false) {
      return false
    }

    if (ctx.editor.isActive('table')) {
      return true
    }

    if (ctx.editor.state.selection.empty === true) {
      return false
    }

    return true
  }, [])

  // When switching from TableMenu to TextMenu inside a cell, the BubbleMenu
  // repositions synchronously (updateDelay=0) before the browser has painted
  // the selection bounds — tippy can't flip above yet. Force a recalculation
  // on the next frame so tippy has real layout info.
  useEffect(() => {
    const shouldForceUpdate = isInTable === true && hasTextSelection === true

    if (shouldForceUpdate !== true) {
      return
    }

    const id = requestAnimationFrame(() => {
      if (editor.isDestroyed === true) {
        return
      }

      editor.view.dispatch(editor.state.tr.setMeta('bubbleMenu', 'updatePosition'))
    })

    return (): void => {
      cancelAnimationFrame(id)
    }
  }, [isInTable, hasTextSelection, editor])

  const getReferencedVirtualElement = useCallback(() => {
    //* Issue: menu is not centered in the middle of the image
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
  }, [editor])

  return (
    <>
      <FloatingLineMenu />
      <BubbleMenu
        ref={(element) => {
          if (element !== null) {
            element.style.zIndex = '1000'
            menuRef.current = element
          }
        }}
        editor={editor}
        updateDelay={isImageActive === true || isInTable === true ? 0 : 250}
        shouldShow={shouldShow}
        getReferencedVirtualElement={getReferencedVirtualElement}
        options={{
          onShow: (): void => {
            //* Issue: for row cells menu is randomly positioned
            requestAnimationFrame(() => {
              editor.view.dispatch(editor.state.tr.setMeta('bubbleMenu', 'updatePosition'))
            })
          },
        }}
      >
        <TiptapMenuLayout>
          {isImageActive === true && <ImageMenu />}
          {isImageActive === false && isInTable === true && hasTextSelection === false && (
            <TableMenu />
          )}
          {isImageActive === false && hasTextSelection === true && <TextMenu />}
        </TiptapMenuLayout>
      </BubbleMenu>
    </>
  )
}
