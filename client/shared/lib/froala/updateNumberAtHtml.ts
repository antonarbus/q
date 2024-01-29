import type FroalaEditor from 'froala-editor'
import { getStringWithNewFormattedNumber } from '../getStringWithNewFormattedNumber'
import { triggerFroalaContentChange } from './triggerFroalaContentChange'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
}

export const updateNumberAtHtml = ({
  oldNumber,
  newNumber,
  html,
  editor,
}: Props): void => {
  const finalHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber,
    newNumber,
  })

  editor.html.set(finalHtml)
}
