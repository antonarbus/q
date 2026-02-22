import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiLink } from 'react-icons/ri'

export const LinkButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('link'))

  return (
    <MenuButton
      isActive={isActive}
      title='Link'
      onClick={() => {
        const attrs = editor.getAttributes('link')
        const existing = typeof attrs.href === 'string' ? attrs.href : ''
        const href = window.prompt('URL', existing)

        if (href === null) {
          return
        }

        if (href === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
          editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
        }
      }}
    >
      <RiLink />
    </MenuButton>
  )
}
