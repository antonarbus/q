import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'

const DEFAULT_SIZE = '16px'

const FONT_SIZES = [
  { label: '10', value: '10px' },
  { label: '12', value: '12px' },
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '20', value: '20px' },
  { label: '24', value: '24px' },
  { label: '28', value: '28px' },
  { label: '32', value: '32px' },
  { label: '36', value: '36px' },
  { label: '48', value: '48px' },
  { label: '72', value: '72px' },
]

export const FontSizeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) =>
    FONT_SIZES.some((item) =>
      ctx.editor.isActive('textStyle', { fontSize: item.value }),
    ),
  )

  const activeSize = useTiptapState((ctx) => {
    for (const item of FONT_SIZES) {
      if (ctx.editor.isActive('textStyle', { fontSize: item.value })) {
        return item.value
      }
    }

    return DEFAULT_SIZE
  })

  const activeSizeLabel =
    FONT_SIZES.find((size) => size.value === activeSize)?.label ?? '16'

  return (
    <MenuButtonWithDropdown
      isActive={isActive}
      title='Font size'
      onClick={() => {
        if (isActive === true) {
          editor.chain().focus().unsetFontSize().run()
        } else {
          editor.chain().focus().setFontSize(activeSize).run()
        }
      }}
      dropdownContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4px',
            gap: '2px',
          }}
        >
          {FONT_SIZES.map((item) => (
            <Box
              key={item.value}
              component='button'
              type='button'
              title={`${item.label}px`}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                if (activeSize === item.value && isActive === true) {
                  editor.chain().focus().unsetFontSize().run()
                } else {
                  editor.chain().focus().setFontSize(item.value).run()
                }
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor:
                  activeSize === item.value && isActive
                    ? '#efefef'
                    : 'transparent',
                cursor: 'pointer',
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
      <Box component='span' sx={{ fontSize: 12 }}>
        {activeSizeLabel}
      </Box>
    </MenuButtonWithDropdown>
  )
}
