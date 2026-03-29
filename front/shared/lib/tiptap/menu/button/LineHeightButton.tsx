import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'

const DEFAULT_LINE_HEIGHT = '1.2'

const LINE_HEIGHTS = [
  { label: '1', value: '1' },
  { label: '1.2', value: '1.2' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
  { label: '2.5', value: '2.5' },
  { label: '3', value: '3' },
]

export const LineHeightButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) =>
    LINE_HEIGHTS.some((item) => ctx.editor.isActive('textStyle', { lineHeight: item.value })),
  )

  const activeLineHeight = useTiptapState((ctx) => {
    for (const item of LINE_HEIGHTS) {
      if (ctx.editor.isActive('textStyle', { lineHeight: item.value })) {
        return item.value
      }
    }

    return DEFAULT_LINE_HEIGHT
  })

  const activeLabel = LINE_HEIGHTS.find((item) => item.value === activeLineHeight)?.label ?? '1.2'

  return (
    <MenuButtonWithDropdown
      isActive={false}
      title='Line height'
      dropdownContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4px',
            gap: '2px',
          }}
        >
          {LINE_HEIGHTS.map((item) => (
            <Box
              key={item.value}
              component='button'
              type='button'
              title={item.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                const isCurrent = activeLineHeight === item.value && isActive === true

                if (isCurrent === true) {
                  editor.chain().focus().unsetLineHeight().run()
                } else {
                  editor.chain().focus().setLineHeight(item.value).run()
                }
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor:
                  activeLineHeight === item.value && isActive ? '#efefef' : 'transparent',
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
        {activeLabel}
      </Box>
    </MenuButtonWithDropdown>
  )
}
