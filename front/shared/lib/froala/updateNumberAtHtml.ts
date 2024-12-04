import type { FroalaEditor } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '../../utils/getStringWithNewFormattedNumber'

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
