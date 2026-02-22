import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiLink, RiLinkUnlink } from 'react-icons/ri'

type Props = {
  onOpenInput: (initialValue: string) => void
}

export const LinkButtons = (props: Props): React.JSX.Element => {
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
          props.onOpenInput(existing)
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
