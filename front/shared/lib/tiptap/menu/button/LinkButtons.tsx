import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiLink, RiLinkUnlink } from 'react-icons/ri'
import { useState } from 'react'

export const LinkButtons = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const [linkInput, setLinkInput] = useState<string | null>(null)

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('link')
  })

  if (linkInput !== null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input
          type='text'
          placeholder='https://...'
          value={linkInput}
          onChange={(event) => {
            setLinkInput(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (linkInput === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
              } else {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .setLink({ href: linkInput })
                  .run()
              }

              setLinkInput(null)
            }

            if (event.key === 'Escape') {
              setLinkInput(null)
            }
          }}
          style={{
            padding: '2px 6px',
            fontSize: 13,
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 4,
            background: 'rgba(0,0,0,0.2)',
            color: 'inherit',
            outline: 'none',
            width: 160,
          }}
          autoFocus
        />
        <MenuButton
          isActive={false}
          title='Apply'
          onClick={() => {
            if (linkInput === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run()
            } else {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: linkInput })
                .run()
            }

            setLinkInput(null)
          }}
        >
          <RiLink size={16} />
        </MenuButton>
        <MenuButton
          isActive={false}
          title='Cancel'
          onClick={() => {
            setLinkInput(null)
          }}
        >
          <RiLinkUnlink size={16} />
        </MenuButton>
      </div>
    )
  }

  return (
    <>
      <MenuButton
        isActive={isActive}
        title='Link'
        onClick={() => {
          const attrs = editor.getAttributes('link')

          const existing = typeof attrs.href === 'string' ? attrs.href : ''

          setLinkInput(existing)
        }}
      >
        <RiLink size={16} />
      </MenuButton>

      {isActive === true ? (
        <MenuButton
          isActive={false}
          title='Unlink'
          onClick={() => {
            editor.chain().focus().unsetLink().run()
          }}
        >
          <RiLinkUnlink size={16} />
        </MenuButton>
      ) : null}
    </>
  )
}
