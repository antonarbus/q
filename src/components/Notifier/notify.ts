// https://fkhadra.github.io/react-toastify/positioning-toast
import { toast, Slide, Bounce, Flip, Zoom } from 'react-toastify'

type Params = {
  msg: string | React.ReactNode
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  hideProgressBar?: boolean
  closeAfterMs?: number
  shouldStay?: true
  type?: 'success' | 'error' | 'warn' | 'info'
  theme?: 'light' | 'dark' | 'colored',
  transition?: 'slide' | 'bounce' | 'flip' | 'zoom',
  onClose?: () => void
}

export function notify({ msg, position, hideProgressBar, shouldStay, closeAfterMs, type, theme, transition, onClose }: Params) {
  const options = {
    position: position || 'top-right',
    autoClose: shouldStay ? false : (closeAfterMs || 5000) as any,
    delay: 0,
    hideProgressBar: hideProgressBar || false,
    closeButton: true,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    theme: theme || 'dark',
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
              : Bounce
  }

  if (type === undefined || type === 'success') {
    toast.success(msg, options)
    return
  }

  if (type === 'error') {
    toast.error(msg, options)
    return
  }

  if (type === 'warn') {
    toast.warn(msg, options)
    return
  }

  if (type === 'info') {
    toast.info(msg, options)
  }
}
