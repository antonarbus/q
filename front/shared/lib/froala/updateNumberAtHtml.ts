import type { FroalaEditor } from '@shared/type/froala'
import { getStringWithNewFormattedNumber } from '../../util/getStringWithNewFormattedNumber'

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
