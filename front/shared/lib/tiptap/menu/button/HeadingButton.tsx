import { useTiptap, useTiptapState } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiText } from 'react-icons/ri'

const HEADINGS = [
  { level: 1, label: 'Heading 1', Icon: RiH1, fontSize: 17, fontWeight: 700 },
  { level: 2, label: 'Heading 2', Icon: RiH2, fontSize: 15, fontWeight: 700 },
  { level: 3, label: 'Heading 3', Icon: RiH3, fontSize: 14, fontWeight: 600 },
  { level: 4, label: 'Heading 4', Icon: RiH4, fontSize: 13, fontWeight: 600 },
  { level: 5, label: 'Heading 5', Icon: RiH5, fontSize: 12, fontWeight: 500 },
] as const

export const HeadingButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) =>
    HEADINGS.some((heading) => ctx.editor.isActive('heading', { level: heading.level })),
  )

  const activeLevel = useTiptapState((ctx) => {
    for (const heading of HEADINGS) {
      if (ctx.editor.isActive('heading', { level: heading.level })) {
        return heading.level
      }
    }

    return null
  })

  const ActiveIcon = HEADINGS.find((heading) => heading.level === activeLevel)?.Icon ?? RiText

  return (
    <MenuButtonWithDropdown
      isActive={false}
      title='Heading'
      dropdownContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: '4px',
          }}
        >
          <Box
            component='button'
            type='button'
            title='Normal text'
            onMouseDown={(event: React.MouseEvent) => {
              event.preventDefault()
            }}
            onClick={() => {
              editor.chain().focus().setParagraph().run()
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '5px 12px',
              border: 'none',
              backgroundColor: isActive === true ? 'transparent' : '#efefef',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              ':hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <RiText size={13} />
            Normal text
          </Box>
          {HEADINGS.map((heading) => (
            <Box
              key={heading.level}
              component='button'
              type='button'
              title={heading.label}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
              }}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: heading.level }).run()
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '5px 12px',
                border: 'none',
                backgroundColor:
                  isActive && activeLevel === heading.level ? '#efefef' : 'transparent',
                cursor: 'pointer',
                fontSize: heading.fontSize,
                fontWeight: heading.fontWeight,
                whiteSpace: 'nowrap',
                ':hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <heading.Icon size={heading.fontSize} />
              {heading.label}
            </Box>
          ))}
        </Box>
      }
    >
      <ActiveIcon />
    </MenuButtonWithDropdown>
  )
}
