import { getNumberFromString, getStringWithNewFormattedNumber, getTextContentFromHtml } from 'client/shared/lib'
import { roundTo } from 'round-to'
import type FroalaEditor from 'froala-editor'
import { getDecimalPrecision } from './getDecimalPrecision'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
  triggerContentChange?: boolean
}

export const updateNumberAtHtmlIncrementally = async ({
  oldNumber,
  newNumber,
  html,
  editor,
  triggerContentChange,
}: Props): Promise<void> => {
  const steps = 100
  const valueDifference = newNumber - oldNumber
  if (valueDifference === 0) return
  const stepValue = valueDifference / steps
  const decimalPrecision = getDecimalPrecision({ valueDifference })

  const incrementValues = async (): Promise<void> => {
    await new Promise(resolve => {
      for (let i = 1; i <= steps; i++) {
        const incrementedValue = roundTo(oldNumber + i * stepValue, decimalPrecision)

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
          if (i === steps) {
            resolve('done')
          }
        }, 5 * i)
      }
    })
  }

  await incrementValues()

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
