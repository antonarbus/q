import type { Editor } from '@tiptap/react'
import { getDecimalPlaces } from '@front/shared/util/getDecimalPlaces'
import { roundTo } from 'round-to'
import { getStringWithNewFormattedNumber } from '../../../util/getStringWithNewFormattedNumber'

type Props = {
  oldNumber: number
  newNumber: number
  html: string
  totalPriceValueEditor: Editor
}

export const updateNumberAtHtmlIncrementally = (props: Props): void => {
  const steps = 100
  const valueDifference = props.newNumber - props.oldNumber

  if (valueDifference === 0) {
    return
  }

  const stepValue = valueDifference / steps
  const decimalPlaces = Math.min(getDecimalPlaces(props.newNumber), 2)

  const incrementValues = async (): Promise<unknown> => {
    const defer = Promise.withResolvers()

    for (let index = 1; index <= steps; index = index + 1) {
      const incrementedValue = roundTo(props.oldNumber + index * stepValue, decimalPlaces)

      const updatedHtml = getStringWithNewFormattedNumber({
        string: props.html,
        newNumber: incrementedValue,
      })

      setTimeout(() => {
        props.totalPriceValueEditor.commands.setContent(updatedHtml, {
          emitUpdate: false,
        })

        if (index === steps) {
          defer.resolve()
        }
      }, 5 * index)
    }

    // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
    // oxlint-disable-next-line typescript/return-await
    return await defer.promise
  }

  const setHtml = async (): Promise<void> => {
    await incrementValues()

    const finalHtml = getStringWithNewFormattedNumber({
      string: props.html,
      newNumber: props.newNumber,
    })

    props.totalPriceValueEditor.commands.setContent(finalHtml, {
      emitUpdate: false,
    })
  }

  setTimeout(() => {
    void setHtml()
  }, 0)
}
