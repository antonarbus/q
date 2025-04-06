import type { FroalaEditor } from '@shared/types/froala'
import { roundTo } from 'round-to'
import { getNumberFromString } from '../../utils/getNumberFromString'
import { getStringWithNewFormattedNumber } from '../../utils/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '../../utils/getTextContentFromHtml'
import { getDecimalPlaces } from '@shared/utils/getDecimalPlaces'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
}

export const updateNumberAtHtmlIncrementally = ({
  oldNumber,
  newNumber,
  html,
  editor,
}: Props): void => {
  const steps = 100
  const valueDifference = newNumber - oldNumber

  if (valueDifference === 0) {
    return
  }

  const stepValue = valueDifference / steps
  const decimalPlaces = Math.min(getDecimalPlaces(newNumber), 2)

  const incrementValues = async (): Promise<void> => {
    await new Promise((resolve) => {
      for (let i = 1; i <= steps; i++) {
        const incrementedValue = roundTo(
          oldNumber + i * stepValue,
          decimalPlaces,
        )

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

  const setHtml = async (): Promise<void> => {
    await incrementValues()

    const finalHtml = getStringWithNewFormattedNumber({
      string: html,
      oldNumber,
      newNumber,
    })

    editor.html.set(finalHtml)
  }

  setTimeout(() => {
    void setHtml()
  })
}
