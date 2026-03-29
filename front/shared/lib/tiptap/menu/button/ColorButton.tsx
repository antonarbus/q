import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'
import { RiFontColor } from 'react-icons/ri'

const DEFAULT_COLOR = '#ef4444'

const TEXT_COLORS = [
  { label: 'Red', color: '#ef4444' },
  { label: 'Orange', color: '#f97316' },
  { label: 'Amber', color: '#f59e0b' },
  { label: 'Green', color: '#22c55e' },
  { label: 'Teal', color: '#14b8a6' },
  { label: 'Blue', color: '#3b82f6' },
  { label: 'Indigo', color: '#6366f1' },
  { label: 'Purple', color: '#a855f7' },
  { label: 'Pink', color: '#ec4899' },
]

export const ColorButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) =>
    TEXT_COLORS.some((item) => ctx.editor.isActive('textStyle', { color: item.color })),
  )

  const activeColor = useTiptapState((ctx) => {
    for (const item of TEXT_COLORS) {
      if (ctx.editor.isActive('textStyle', { color: item.color })) {
        return item.color
      }
    }

    return DEFAULT_COLOR
  })

  return (
    <MenuButtonWithDropdown
      isActive={isActive}
      title='Text color'
      onClick={() => {
        editor.chain().focus().setColor(activeColor).run()
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
          {TEXT_COLORS.map((item) => (
            <Box
              key={item.label}
              component='button'
              type='button'
              title={item.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                editor.chain().focus().setColor(item.color).run()
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
      <RiFontColor color={activeColor} />
    </MenuButtonWithDropdown>
  )
}
