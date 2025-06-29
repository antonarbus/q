import type { FroalaEditor } from '@shared/type/froala'
import { roundTo } from 'round-to'
import { getNumberFromString } from '../../util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '../../util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '../../util/getTextContentFromHtml'
import { getDecimalPlaces } from '@shared/util/getDecimalPlaces'

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
      for (let index = 1; index <= steps; index = index + 1) {
        const incrementedValue = roundTo(
          oldNumber + index * stepValue,
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

          if (index === steps) {
            resolve('done')
          }
        }, 5 * index)
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
