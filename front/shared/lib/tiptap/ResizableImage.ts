import Image from '@tiptap/extension-image'
import type { NodeView } from '@tiptap/pm/view'

const applyAlignment = (dom: HTMLElement, textAlign: unknown): void => {
  if (textAlign === 'center') {
    dom.style.justifyContent = 'center'
  } else if (textAlign === 'right') {
    dom.style.justifyContent = 'flex-end'
  } else {
    dom.style.justifyContent = ''
  }
}

export const ResizableImage = Image.extend({
  addNodeView() {
    const createNodeView = this.parent?.()

    if (createNodeView === null || createNodeView === undefined) {
      return null
    }

    return (
      props,
    ): NodeView & {
      dom: Node
    } => {
      const nodeView = createNodeView(props)

      if (nodeView.dom instanceof HTMLElement === false) {
        throw new Error('Not an HTMLElement')
      }

      applyAlignment(nodeView.dom, props.node.attrs.textAlign)

      const originalUpdate = nodeView.update?.bind(nodeView)

      nodeView.update = (node, decorations, innerDecorations): boolean => {
        const result =
          originalUpdate?.(node, decorations, innerDecorations) ?? true

        if (result === true) {
          if (nodeView.dom instanceof HTMLElement === false) {
            throw new Error('Not an HTMLElement')
          }

          applyAlignment(nodeView.dom, node.attrs.textAlign)
        }

        return result
      }

      return nodeView
    }
  },
})
