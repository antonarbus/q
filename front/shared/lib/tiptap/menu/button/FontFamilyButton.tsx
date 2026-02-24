import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'

const DEFAULT_FONT: { label: string; value: string } = {
  label: 'System',
  value: 'system-ui',
}

const FONT_FAMILIES = [
  { label: 'System', value: 'system-ui' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Mono', value: 'ui-monospace, monospace' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times', value: 'Times New Roman, serif' },
  { label: 'Courier', value: 'Courier New, monospace' },
]

export const FontFamilyButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const activeFont = useTiptapState((ctx) => {
    for (const item of FONT_FAMILIES) {
      if (ctx.editor.isActive('textStyle', { fontFamily: item.value })) {
        return item
      }
    }

    return DEFAULT_FONT
  })

  return (
    <MenuButtonWithDropdown
      isActive={activeFont.value !== DEFAULT_FONT.value}
      title='Font family'
      dropdownContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4px',
            gap: '2px',
          }}
        >
          {FONT_FAMILIES.map((item) => (
            <Box
              key={item.value}
              component='button'
              type='button'
              title={item.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                if (activeFont.value === item.value && item.value !== DEFAULT_FONT.value) {
                  editor.chain().focus().unsetFontFamily().run()
                } else {
                  editor.chain().focus().setFontFamily(item.value).run()
                }
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor:
                  activeFont.value === item.value ? '#efefef' : 'transparent',
                cursor: 'pointer',
                fontFamily: item.value,
                fontSize: 13,
                ':hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      }
    >
      <Box component='span' sx={{ fontSize: 12, fontFamily: activeFont.value }}>
        {activeFont.label}
      </Box>
    </MenuButtonWithDropdown>
  )
}
