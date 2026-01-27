import Image from '@tiptap/extension-image'
import type { NodeView } from '@tiptap/pm/view'

export const ResizableImage = Image.extend({
  addNodeView() {
    const createNodeView = this.parent?.()

    if (createNodeView === null) {
      return null
    }

    if (createNodeView === undefined) {
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

      if (props.node.attrs.textAlign === 'center') {
        nodeView.dom.style.justifyContent = 'center'
      } else if (props.node.attrs.textAlign === 'right') {
        nodeView.dom.style.justifyContent = 'flex-end'
      } else {
        nodeView.dom.style.justifyContent = ''
      }

      const originalUpdate = nodeView.update?.bind(nodeView)

      nodeView.update = (node, decorations, innerDecorations): boolean => {
        const result =
          originalUpdate?.(node, decorations, innerDecorations) ?? true

        if (result === true) {
          if (nodeView.dom instanceof HTMLElement === false) {
            throw new Error('Not an HTMLElement')
          }

          if (node.attrs.textAlign === 'center') {
            nodeView.dom.style.justifyContent = 'center'
          } else if (node.attrs.textAlign === 'right') {
            nodeView.dom.style.justifyContent = 'flex-end'
          } else {
            nodeView.dom.style.justifyContent = ''
          }
        }

        return result
      }

      return nodeView
    }
  },
})
