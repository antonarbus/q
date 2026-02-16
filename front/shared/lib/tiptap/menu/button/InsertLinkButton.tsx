import type { Editor } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiLink } from 'react-icons/ri'
import { useState } from 'react'

type Props = {
  editor: Editor
  onDone?: () => void
}

export const InsertLinkButton = (props: Props): React.JSX.Element => {
  const [linkInput, setLinkInput] = useState<string | null>(null)

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
              if (linkInput.trim() !== '') {
                props.editor
                  .chain()
                  .focus()
                  .insertContent({
                    type: 'text',
                    text: linkInput,
                    marks: [{ type: 'link', attrs: { href: linkInput } }],
                  })
                  .run()
              }

              setLinkInput(null)
              props.onDone?.()
            }

            if (event.key === 'Escape') {
              setLinkInput(null)
              props.editor.commands.focus()
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
          title='Insert'
          onClick={() => {
            if (linkInput.trim() !== '') {
              props.editor
                .chain()
                .focus()
                .insertContent({
                  type: 'text',
                  text: linkInput,
                  marks: [{ type: 'link', attrs: { href: linkInput } }],
                })
                .run()
            }

            setLinkInput(null)
            props.onDone?.()
          }}
        >
          <RiLink />
        </MenuButton>
      </div>
    )
  }

  return (
    <MenuButton
      isActive={false}
      title='Insert link'
      onClick={() => {
        setLinkInput('')
      }}
    >
      <RiLink />
    </MenuButton>
  )
}
