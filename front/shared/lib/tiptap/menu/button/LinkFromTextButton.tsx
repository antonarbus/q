import { useTiptap, useTiptapState } from '@tiptap/react'
import { TextSelection } from '@tiptap/pm/state'
import { MenuButton } from './shared/MenuButton'
import { RiLink } from 'react-icons/ri'
import { confirmWithDialog } from '@front/shared/component/ConfirmationDialog'

export const LinkFromTextButton = (): React.JSX.Element => {
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
      onClick={async () => {
        const { from, to } = editor.state.selection
        const attrs = editor.getAttributes('link')
        const existing = typeof attrs.href === 'string' ? attrs.href : ''

        const href = await confirmWithDialog({
          inputLabel: 'Url',
          title: 'Link',
          initialValue: existing ? attrs.href : '',
          description: '',
          confirmButtonText: 'Add',
          rejectButtonText: 'Cancel',
        })

        if (href === false) {
          return
        }

        const isCancelled = href === null || href.trim() === ''

        if (isCancelled === true) {
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

        editor.view.focus()

        const tr = editor.state.tr
          .setSelection(TextSelection.create(editor.state.doc, from, to))
          .addMark(from, to, linkMark.create({ href: normalizedHref }))

        editor.view.dispatch(tr)
      }}
    >
      <RiLink />
    </MenuButton>
  )
}
