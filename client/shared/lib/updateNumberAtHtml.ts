import { getStringWithNewFormattedNumber } from '@shared/lib'
import type FroalaEditor from 'froala-editor'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
  triggerContentChange?: boolean
}

export const updateNumberAtHtml = ({
  oldNumber,
  newNumber,
  html,
  editor,
  triggerContentChange,
}: Props): void => {
  const finalHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber,
    newNumber,
  })

  editor.html.set(finalHtml)

  if (triggerContentChange) {
    editor.undo.saveStep()
  }
}
