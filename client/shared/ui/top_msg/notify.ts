// https://fkhadra.github.io/react-toastify/positioning-toast
import type { ReactNode } from 'react'
import { toast, Slide, Bounce, Flip, Zoom } from 'react-toastify'

type Props = {
  msg: ReactNode | string
  position?:
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'top-left'
    | 'top-right'
  hideProgressBar?: boolean
  closeAfterMs?: number
  shouldStay?: true
  type?: 'error' | 'info' | 'success' | 'warn'
  theme?: 'colored' | 'dark' | 'light'
  transition?: 'bounce' | 'flip' | 'slide' | 'zoom'
  onClose?: () => void
}

export const notify = ({
  msg,
  position,
  hideProgressBar,
  shouldStay,
  closeAfterMs,
  type,
  theme,
  transition,
  onClose,
}: Props): void => {
  const options = {
    position: position ?? 'top-right',
    autoClose: shouldStay ? false : closeAfterMs ?? 5000,
    delay: 0,
    hideProgressBar: hideProgressBar ?? false,
    closeButton: true,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    theme: theme ?? 'dark',
    onClose,
    // onOpen: () => window.alert('Called when I open'),
    transition:
      transition === 'slide'
        ? Slide
        : transition === 'bounce'
          ? Bounce
          : transition === 'flip'
            ? Flip
            : transition === 'zoom'
              ? Zoom
              : Bounce,
  }

  if (type === undefined || type === 'success') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toast.success(msg, options)
    return
  }

  if (type === 'error') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toast.error(msg, options)
    return
  }

  if (type === 'warn') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toast.warn(msg, options)
    return
  }

  // type === 'info'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  toast.info(msg, options)
}
