import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getStringWithNewFormattedNumber } from '../../util/getStringWithNewFormattedNumber'

type Props = {
  newNumber: number
  html: string
  editor: FroalaEditor
}

export const updateNumberAtHtml = (props: Props): void => {
  const finalHtml = getStringWithNewFormattedNumber({
    string: props.html,
    newNumber: props.newNumber,
  })

  props.editor.html.set(finalHtml)
}
