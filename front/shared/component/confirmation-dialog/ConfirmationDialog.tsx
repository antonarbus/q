import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { reduxHolder } from '@front/shared/lib/redux'
import { appSlice } from '@front/shared/appSlice'
import { resolveDialogConfirm, resolveDialogReject } from './confirmWithDialog'

export const ConfirmationDialog = (): React.JSX.Element => {
  const DO_NOT_ASK_AGAIN_SESSION_VALUE = 'true'

  const confirmationDialog = reduxHolder.useSelector((state) => state.app.confirmationDialog)

  const [inputValue, setInputValue] = useState(confirmationDialog.initialValue ?? '')

  useLayoutEffect(() => {
    const shouldAutoConfirm =
      confirmationDialog.isOpen === true &&
      confirmationDialog.shouldShowDoNotAskAgainCheckbox === true

    if (shouldAutoConfirm === true) {
      const doNotAskAgainValue = sessionStorage.getItem(confirmationDialog.doNotAskAgainSessionKey)

      if (doNotAskAgainValue === DO_NOT_ASK_AGAIN_SESSION_VALUE) {
        reduxHolder.dispatch(appSlice.actions.closeConfirmationDialog())
        resolveDialogConfirm()
      }
    }
  }, [
    confirmationDialog.isOpen,
    confirmationDialog.shouldShowDoNotAskAgainCheckbox,
    confirmationDialog.doNotAskAgainSessionKey,
  ])

  const handleReject = (): void => {
    setInputValue('')
    reduxHolder.dispatch(appSlice.actions.closeConfirmationDialog())
    resolveDialogReject()
  }

  const handleConfirm = (): void => {
    const resolveArg = confirmationDialog.inputLabel === undefined ? undefined : inputValue

    setInputValue('')

    if (confirmationDialog.disableCloseButton !== true) {
      reduxHolder.dispatch(appSlice.actions.closeConfirmationDialog())
    }

    resolveDialogConfirm(resolveArg)
  }

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

        {confirmationDialog.inputLabel !== undefined && (
          <TextField
            autoFocus
            focused
            size='small'
            label={confirmationDialog.inputLabel}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleConfirm()
              }
            }}
          />
        )}

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
                sessionStorage.removeItem(confirmationDialog.doNotAskAgainSessionKey)
              }
            }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 3, gap: 1 }}>
        <Button variant='outlined' fullWidth onClick={handleReject}>
          {confirmationDialog.rejectButtonText ?? 'No'}
        </Button>
        <Button
          variant='contained'
          fullWidth
          autoFocus={confirmationDialog.inputLabel === undefined}
          onClick={handleConfirm}
        >
          {confirmationDialog.confirmButtonText ?? 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
