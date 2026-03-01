import { useTiptap, useTiptapState } from '@tiptap/react'
import { TextSelection } from '@tiptap/pm/state'
import { MenuButton } from './shared/MenuButton'
import { RiLink } from 'react-icons/ri'

export const LinkButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('link'))

  const isDisabled = useTiptapState((ctx) => {
    const { selection, doc } = ctx.editor.state

    if (selection.empty) {
      return true
    }

    const textSelected = doc.textBetween(selection.from, selection.to).trim()

    return textSelected === ''
  })

  return (
    <MenuButton
      isActive={isActive}
      disabled={isDisabled}
      title='Link'
      onClick={() => {
        const { from, to } = editor.state.selection
        const attrs = editor.getAttributes('link')
        const existing = typeof attrs.href === 'string' ? attrs.href : ''
        const href = window.prompt('URL', existing)

        const isCancelled = href === null || href.trim() === ''

        if (isCancelled === true) {
          return
        }

        const normalizedHref =
          href.trim().startsWith('http://') || href.trim().startsWith('https://') || href.trim().startsWith('mailto:')
            ? href.trim()
            : `https://${href.trim()}`

        const linkMark = editor.schema.marks.link

        if (linkMark === undefined) {
          return
        }

        editor.view.focus()

        const { state } = editor

        const tr = state.tr
          .setSelection(TextSelection.create(state.doc, from, to))
          .addMark(from, to, linkMark.create({ href: normalizedHref }))

        editor.view.dispatch(tr)
      }}
    >
      <RiLink />
    </MenuButton>
  )
}
