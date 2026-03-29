import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { MdAddLink } from 'react-icons/md'

export const InsertLinkButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Insert link'
      onClick={() => {
        const href = window.prompt('URL')

        if (href === null || href.trim() === '') {
          return
        }

        const normalizedHref =
          href.trim().startsWith('http://') ||
          href.trim().startsWith('https://') ||
          href.trim().startsWith('mailto:')
            ? href.trim()
            : `https://${href.trim()}`

        const linkMark = editor.schema.marks.link

        if (linkMark === undefined) {
          return
        }

        const { from } = editor.state.selection

        editor.view.focus()

        const tr = editor.state.tr
          .insertText(normalizedHref, from)
          .addMark(from, from + normalizedHref.length, linkMark.create({ href: normalizedHref }))

        editor.view.dispatch(tr)
      }}
    >
      <MdAddLink />
    </MenuButton>
  )
}
