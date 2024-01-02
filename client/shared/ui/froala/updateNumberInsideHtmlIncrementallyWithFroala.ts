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
  const steps = 1000
  const valueDifference = newNumber - oldNumber
  const stepValue = valueDifference / steps

  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
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

      editor.html.set(updatedHtml)
    }, 10)
  }

  setTimeout(() => {
    const finalHtml = getStringWithNewFormattedNumber({
      string: html,
      oldNumber,
      newNumber,
    })

    editor.html.set(finalHtml)
  }, 100)
}
