import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from 'react-icons/ri'

const ALIGNMENTS = [
  { value: 'left', label: 'Align left', Icon: RiAlignLeft },
  { value: 'center', label: 'Align center', Icon: RiAlignCenter },
  { value: 'right', label: 'Align right', Icon: RiAlignRight },
] as const

type AlignValue = (typeof ALIGNMENTS)[number]['value']

export const AlignButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const activeAlign = useTiptapState((ctx): AlignValue => {
    if (ctx.editor.isActive({ textAlign: 'right' })) {
      return 'right'
    }

    if (ctx.editor.isActive({ textAlign: 'center' })) {
      return 'center'
    }

    return 'left'
  })

  const isActive = activeAlign === 'center' || activeAlign === 'right'

  const ActiveIcon =
    ALIGNMENTS.find((alignment) => alignment.value === activeAlign)?.Icon ?? RiAlignCenter

  return (
    <MenuButtonWithDropdown
      isActive={isActive}
      title='Text align'
      dropdownContent={
        <Box
          sx={{
            display: 'flex',
            gap: '2px',
            padding: '4px',
          }}
        >
          {ALIGNMENTS.map((alignment) => (
            <Box
              key={alignment.value}
              component='button'
              type='button'
              title={alignment.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                editor.chain().focus().setTextAlign(alignment.value).run()
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                border: 'none',
                borderRadius: '4px',
                backgroundColor: activeAlign === alignment.value ? '#efefef' : 'transparent',
                cursor: 'pointer',
                fontSize: 16,
                ':hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <alignment.Icon />
            </Box>
          ))}
        </Box>
      }
    >
      <ActiveIcon />
    </MenuButtonWithDropdown>
  )
}
