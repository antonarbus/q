import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { ConfirmationDialogOptions } from './types'
import { appSlice } from '@front/shared/appSlice'

let boolDeferred = Promise.withResolvers<boolean>()
let stringDeferred = Promise.withResolvers<string | false>()
let isInputMode = false

export function confirmWithDialog(
  props: ConfirmationDialogOptions & { inputLabel: string },
): Promise<string | false>
export function confirmWithDialog(props?: ConfirmationDialogOptions): Promise<boolean>

export async function confirmWithDialog(
  props: ConfirmationDialogOptions = {},
): Promise<string | boolean> {
  isInputMode = 'inputLabel' in props

  if (isInputMode === true) {
    stringDeferred = Promise.withResolvers<string | false>()
    reduxHolder.dispatch(appSlice.actions.openConfirmationDialog(props))

    // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
    // oxlint-disable-next-line typescript/return-await
    return await stringDeferred.promise
  }

  boolDeferred = Promise.withResolvers<boolean>()
  reduxHolder.dispatch(appSlice.actions.openConfirmationDialog(props))

  // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
  // oxlint-disable-next-line typescript/return-await
  return await boolDeferred.promise
}

export const resolveDialogReject = (): void => {
  if (isInputMode === true) {
    stringDeferred.resolve(false)
  } else {
    boolDeferred.resolve(false)
  }
}

export const resolveDialogConfirm = (inputValue?: string): void => {
  const shouldResolveWithString = isInputMode === true && inputValue !== undefined

  if (shouldResolveWithString === true) {
    stringDeferred.resolve(inputValue)
  } else {
    boolDeferred.resolve(true)
  }
}
