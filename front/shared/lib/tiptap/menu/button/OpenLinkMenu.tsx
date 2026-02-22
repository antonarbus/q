import { useTiptap } from '@tiptap/react'
import { useState } from 'react'
import { MenuButton } from './shared/MenuButton'
import { RiLink, RiLinkUnlink } from 'react-icons/ri'

type Props = {
  initialValue: string
  onClose: () => void
}

export const OpenLinkMenu = (props: Props): React.JSX.Element => {
  const { editor } = useTiptap()
  const [value, setValue] = useState(props.initialValue)

  const apply = (): void => {
    if (value === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: value }).run()
    }

    props.onClose()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <input
        type='text'
        placeholder='https://...'
        autoFocus
        value={value}
        onChange={(event) => { setValue(event.target.value) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            apply()
          }

          if (event.key === 'Escape') {
            props.onClose()
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
      />
      <MenuButton isActive={false} title='Apply' onClick={apply}>
        <RiLink />
      </MenuButton>
      <MenuButton isActive={false} title='Cancel' onClick={props.onClose}>
        <RiLinkUnlink />
      </MenuButton>
    </div>
  )
}
