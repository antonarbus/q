import { reduxHolder } from '@front/shared/lib/redux'
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

    return stringDeferred.promise
  }

  boolDeferred = Promise.withResolvers<boolean>()
  reduxHolder.dispatch(appSlice.actions.openConfirmationDialog(props))

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
