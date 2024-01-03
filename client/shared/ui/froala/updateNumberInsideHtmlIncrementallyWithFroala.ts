import { getNumberFromString, getStringWithNewFormattedNumber, getTextContentFromHtml } from 'client/shared/lib'
import { roundTo } from 'round-to'
import type FroalaEditor from 'froala-editor'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
}

export const updateNumberInsideHtmlIncrementallyWithFroala = ({
  oldNumber,
  newNumber,
  html,
  editor,
}: Props): void => {
  const steps = 100
  const valueDifference = newNumber - oldNumber
  const stepValue = valueDifference / steps

  for (let i = 1; i <= steps; i++) {
    const incrementedValue = roundTo(oldNumber + i * stepValue, 0)

    const textContent = getTextContentFromHtml({ html })

    const numberFromHtml = getNumberFromString({
      string: textContent,
    })

    const updatedHtml = getStringWithNewFormattedNumber({
      string: html,
      oldNumber: numberFromHtml,
      newNumber: incrementedValue,
    })

    setTimeout(() => {
      editor.html.set(updatedHtml)
    }, 5 * i)
  }

  setTimeout(() => {
    const finalHtml = getStringWithNewFormattedNumber({
      string: html,
      oldNumber,
      newNumber,
    })

    editor.html.set(finalHtml)
  }, 5 * steps + 50)
}
