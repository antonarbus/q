import type { Editor } from '@tiptap/react'
import { getStringWithNewFormattedNumber } from '../../util/getStringWithNewFormattedNumber'

type Props = {
  newNumber: number
  html: string
  editor: Editor
}

export const updateNumberAtHtml = (props: Props): void => {
  const finalHtml = getStringWithNewFormattedNumber({
    string: props.html,
    newNumber: props.newNumber,
  })

  props.editor.html.set(finalHtml)
}
