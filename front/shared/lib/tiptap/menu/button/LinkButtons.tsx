import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiLink, RiLinkUnlink } from 'react-icons/ri'

export const LinkButtons = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('link'))

  return (
    <>
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

      {isActive === true ? (
        <MenuButton
          isActive={false}
          title='Unlink'
          onClick={() => {
            editor.chain().focus().unsetLink().run()
          }}
        >
          <RiLinkUnlink />
        </MenuButton>
      ) : null}
    </>
  )
}
