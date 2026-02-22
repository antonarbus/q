import type { Editor } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiYoutubeLine } from 'react-icons/ri'
import { RxUpload } from 'react-icons/rx'
import { useState } from 'react'

type Props = {
  editor: Editor
  onDone?: () => void
}

export const YouTubeButton = (props: Props): React.JSX.Element => {
  const [urlInput, setUrlInput] = useState<string | null>(null)

  if (urlInput !== null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input
          type='text'
          placeholder='YouTube URL...'
          autoFocus
          value={urlInput}
          onChange={(event) => {
            setUrlInput(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (urlInput.trim() !== '') {
                props.editor.commands.setYoutubeVideo({ src: urlInput })
              }

              setUrlInput(null)
              props.onDone?.()
            }

            if (event.key === 'Escape') {
              setUrlInput(null)
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
        />
        <MenuButton
          isActive={false}
          title='Insert'
          onClick={() => {
            if (urlInput.trim() !== '') {
              props.editor.commands.setYoutubeVideo({ src: urlInput })
            }

            setUrlInput(null)
            props.onDone?.()
          }}
        >
          <RxUpload />
        </MenuButton>
      </div>
    )
  }

  return (
    <MenuButton
      isActive={false}
      title='YouTube video'
      onClick={() => {
        setUrlInput('')
      }}
    >
      <RiYoutubeLine />
    </MenuButton>
  )
}
