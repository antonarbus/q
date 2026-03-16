import type { Editor } from '@tiptap/react'

const registry = new Map<string, Editor>()

export const editorRegistry = {
  set: (key: string, editor: Editor | null): void => {
    if (editor !== null) {
      registry.set(key, editor)
    }
  },
  delete: (key: string): void => {
    registry.delete(key)
  },
  get: (key: string): Editor | undefined => {
    return registry.get(key)
  },
}
