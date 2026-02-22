import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButtonWithDropdown } from './shared/MenuButtonWithDropdown'
import { RiMarkPenLine } from 'react-icons/ri'

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

  const dropdownItems = HIGHLIGHT_COLORS.map((item) => ({
    label: item.label,
    color: item.color,
    onClick: (): void => {
      editor.chain().focus().toggleHighlight({ color: item.color }).run()
    },
  }))

  return (
    <MenuButtonWithDropdown
      isActive={isActive}
      title='Highlight'
      dropdownItems={dropdownItems}
      onClick={() => {
        editor.chain().focus().toggleHighlight({ color: activeColor }).run()
      }}
    >
      <RiMarkPenLine color={activeColor} />
    </MenuButtonWithDropdown>
  )
}
