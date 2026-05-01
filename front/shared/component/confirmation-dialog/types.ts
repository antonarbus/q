type ConfirmationDialogBase = {
  title?: string
  description?: string
  confirmButtonText?: string
  rejectButtonText?: string
  disableCloseButton?: true
  inputLabel?: string
  initialValue?: string
}

export type ConfirmationDialogOptions =
  | (ConfirmationDialogBase & {
      shouldShowDoNotAskAgainCheckbox?: never
      doNotAskAgainSessionKey?: never
    })
  | (ConfirmationDialogBase & {
      shouldShowDoNotAskAgainCheckbox: true
      doNotAskAgainSessionKey: string
    })
