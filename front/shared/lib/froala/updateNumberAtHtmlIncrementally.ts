import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getDecimalPlaces } from '@shared/util/getDecimalPlaces'
import { roundTo } from 'round-to'
import { getNumberFromString } from '../../util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '../../util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '../../util/getTextContentFromHtml'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  editor: FroalaEditor
}

export const updateNumberAtHtmlIncrementally = (props: Props): void => {
  const steps = 100
  const valueDifference = props.newNumber - props.oldNumber

  if (valueDifference === 0) {
    return
  }

  const stepValue = valueDifference / steps
  const decimalPlaces = Math.min(getDecimalPlaces(props.newNumber), 2)

  const incrementValues = async (): Promise<void> => {
    await new Promise((resolve) => {
      for (let index = 1; index <= steps; index = index + 1) {
        const incrementedValue = roundTo(
          props.oldNumber + index * stepValue,
          decimalPlaces,
        )

        const textContent = getTextContentFromHtml({ html: props.html })

        const numberFromHtml = getNumberFromString({
          string: textContent,
        })

        const updatedHtml = getStringWithNewFormattedNumber({
          string: props.html,
          oldNumber: numberFromHtml,
          newNumber: incrementedValue,
        })

        setTimeout(() => {
          props.editor.html.set(updatedHtml)

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
      string: props.html,
      oldNumber: props.oldNumber,
      newNumber: props.newNumber,
    })

    props.editor.html.set(finalHtml)
  }

  setTimeout(() => {
    void setHtml()
  })
}
