import Image from '@tiptap/extension-image'
import type { NodeView } from '@tiptap/pm/view'

export const ResizableImage = Image.extend({
  inline: true,
  group: 'inline',

  addNodeView() {
    const createNodeView = this.parent?.()

    const isNodeViewMissing = createNodeView === null || createNodeView === undefined

    if (isNodeViewMissing === true) {
      return null
    }

    return (
      props,
    ): NodeView & {
      dom: Node
    } => {
      const nodeView = createNodeView(props)

      if (nodeView.dom instanceof HTMLElement === false) {
        throw new TypeError('Not an HTMLElement')
      }

      nodeView.dom.style.display = 'inline-flex'
      nodeView.dom.style.padding = '0 3px'

      if (typeof props.node.attrs.textAlign === 'string') {
        if (props.node.attrs.textAlign === 'center') {
          nodeView.dom.style.justifyContent = 'center'
        }

        if (props.node.attrs.textAlign === 'right') {
          nodeView.dom.style.justifyContent = 'flex-end'
        }

        if (props.node.attrs.textAlign === 'left') {
          nodeView.dom.style.justifyContent = ''
        }

        if (props.node.attrs.textAlign === '') {
          nodeView.dom.style.justifyContent = ''
        }

        // Stamp the alignment with "data-image-align" attribute so getClosestPaperElementHtml() can read it from the
        // DOM snapshot and apply correct alignment in the copy preview.
        nodeView.dom.dataset.imageAlign = props.node.attrs.textAlign
      }

      const originalUpdate = nodeView.update?.bind(nodeView)

      nodeView.update = (node, decorations, innerDecorations): boolean => {
        const result = originalUpdate?.(node, decorations, innerDecorations) ?? true

        if (result === true) {
          if (nodeView.dom instanceof HTMLElement === false) {
            throw new TypeError('Not an HTMLElement')
          }

          nodeView.dom.style.display = 'inline-flex'

          if (typeof node.attrs.textAlign === 'string') {
            if (node.attrs.textAlign === 'center') {
              nodeView.dom.style.justifyContent = 'center'
            }

            if (node.attrs.textAlign === 'right') {
              nodeView.dom.style.justifyContent = 'flex-end'
            }

            if (node.attrs.textAlign === 'left') {
              nodeView.dom.style.justifyContent = ''
            }

            if (node.attrs.textAlign === '') {
              nodeView.dom.style.justifyContent = ''
            }

            // Stamp the alignment with "data-image-align" attribute so getClosestPaperElementHtml() can read it from the
            // DOM snapshot and apply correct alignment in the copy preview.
            nodeView.dom.dataset.imageAlign = node.attrs.textAlign
          }
        }

        return result
      }

      return nodeView
    }
  },
})
