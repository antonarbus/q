import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'
import { FaHighlighter } from 'react-icons/fa'

const DEFAULT_COLOR = '#f8d38d'

const HIGHLIGHT_COLORS = [
  { label: 'Yellow', color: '#fef08a' },
  { label: 'Orange', color: '#f8d38d' },
  { label: 'Peach', color: '#fcd5b4' },
  { label: 'Lime', color: '#d9f99d' },
  { label: 'Green', color: '#86efac' },
  { label: 'Teal', color: '#67e8f9' },
  { label: 'Blue', color: '#93c5fd' },
  { label: 'Purple', color: '#c4b5fd' },
  { label: 'Pink', color: '#fda4af' },
]

export const HighlightButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('highlight'))

  const activeColor = useTiptapState((ctx) => {
    for (const item of HIGHLIGHT_COLORS) {
      if (ctx.editor.isActive('highlight', { color: item.color })) {
        return item.color
      }
    }

    return DEFAULT_COLOR
  })

  return (
    <MenuButtonWithDropdown
      isActive={isActive}
      title='Highlight'
      onClick={() => {
        editor.chain().focus().toggleHighlight({ color: activeColor }).run()
      }}
      dropdownContent={
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 18px)',
            gap: '5px',
            padding: 1,
          }}
        >
          {HIGHLIGHT_COLORS.map((item) => (
            <Box
              key={item.label}
              component='button'
              type='button'
              title={item.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: item.color })
                  .run()
              }}
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '1.5px solid rgba(0,0,0,0.15)',
                backgroundColor: item.color,
                cursor: 'pointer',
                padding: 0,
                transition: 'transform 0.1s, box-shadow 0.1s',
                ':hover': {
                  transform: 'scale(1.15)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                },
              }}
            />
          ))}
        </Box>
      }
    >
      <FaHighlighter color={activeColor} />
    </MenuButtonWithDropdown>
  )
}
