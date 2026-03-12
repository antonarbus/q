import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@mui/material'
import { useLayoutEffect } from 'react'
import { dispatch, useSelector } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

let confirmationResultDeferred = Promise.withResolvers<boolean>()

export const confirmWithDialog = async (
  props: ConfirmationDialogOptions = {},
): Promise<boolean> => {
  confirmationResultDeferred = Promise.withResolvers<boolean>()
  dispatch(appSlice.actions.openConfirmationDialog(props))

  return confirmationResultDeferred.promise
}

type ConfirmationDialogBase = {
  title?: string
  description?: string
  confirmButtonText?: string
  rejectButtonText?: string
  disableCloseButton?: true
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

export const ConfirmationDialog = (): React.JSX.Element => {
  const DO_NOT_ASK_AGAIN_SESSION_VALUE = 'true'

  const confirmationDialog = useSelector(
    (state) => state.app.confirmationDialog,
  )

  useLayoutEffect(() => {
    if (
      confirmationDialog.isOpen &&
      confirmationDialog.shouldShowDoNotAskAgainCheckbox
    ) {
      const doNotAskAgainValue = sessionStorage.getItem(
        confirmationDialog.doNotAskAgainSessionKey,
      )

      if (doNotAskAgainValue === DO_NOT_ASK_AGAIN_SESSION_VALUE) {
        dispatch(appSlice.actions.closeConfirmationDialog())
        confirmationResultDeferred.resolve(true)
      }
    }
  }, [confirmationDialog.isOpen])

  return (
    <Dialog
      open={confirmationDialog.isOpen}
      data-testid='confirmation-dialog'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      slotProps={{
        paper: { sx: { minWidth: 360, borderRadius: 2, padding: 1 } },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
        {confirmationDialog.title ?? 'Confirmation'}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBlock: '0px',
          gap: '20px',
        }}
      >
        <DialogContentText sx={{ whiteSpace: 'pre-line' }}>
          {confirmationDialog.description ?? 'Are you sure?'}
        </DialogContentText>

        {confirmationDialog.shouldShowDoNotAskAgainCheckbox === true && (
          <FormControlLabel
            control={<Checkbox disableTouchRipple />}
            label='Do not ask again'
            onChange={(_event, checked) => {
              if (checked === true) {
                sessionStorage.setItem(
                  confirmationDialog.doNotAskAgainSessionKey,
                  DO_NOT_ASK_AGAIN_SESSION_VALUE,
                )
              } else {
                sessionStorage.removeItem(
                  confirmationDialog.doNotAskAgainSessionKey,
                )
              }
            }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 3, gap: 1 }}>
        <Button
          variant='outlined'
          fullWidth
          onClick={() => {
            dispatch(appSlice.actions.closeConfirmationDialog())
            confirmationResultDeferred.resolve(false)
          }}
        >
          {confirmationDialog.rejectButtonText ?? 'No'}
        </Button>
        <Button
          variant='contained'
          fullWidth
          autoFocus
          onClick={() => {
            if (confirmationDialog.disableCloseButton !== true) {
              dispatch(appSlice.actions.closeConfirmationDialog())
            }

            confirmationResultDeferred.resolve(true)
          }}
        >
          {confirmationDialog.confirmButtonText ?? 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
