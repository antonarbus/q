import { useTiptap } from '@tiptap/react'
import { useState } from 'react'
import { MenuButton } from './shared/MenuButton'
import { RxUpload } from 'react-icons/rx'

type Props = {
  onClose: () => void
}

export const OpenYouTubeMenu = (props: Props): React.JSX.Element => {
  const { editor } = useTiptap()
  const [value, setValue] = useState('')

  const insert = (): void => {
    if (value.trim() !== '') {
      editor.commands.setYoutubeVideo({ src: value })
    }

    props.onClose()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <input
        type='text'
        placeholder='YouTube URL...'
        autoFocus
        value={value}
        onChange={(event) => { setValue(event.target.value) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            insert()
          }

          if (event.key === 'Escape') {
            props.onClose()
            editor.commands.focus()
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
      <MenuButton isActive={false} title='Insert' onClick={insert}>
        <RxUpload />
      </MenuButton>
    </div>
  )
}
