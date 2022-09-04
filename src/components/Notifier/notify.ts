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
  transition?: 'slide' | 'bounce' | 'flip' | 'zoom'
}

export function notify({ msg, position, hideProgressBar, shouldStay, closeAfterMs, type, theme, transition }: Params) {
  const options = {
    position: position || 'bottom-center',
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
    // onOpen: () => window.alert('Called when I open'),
    // onClose: () => window.alert('Called when I close')
    transition:
      transition === 'slide'
        ? Slide
        : transition === 'bounce'
          ? Bounce
          : transition === 'flip'
            ? Flip
            : transition === 'zoom'
              ? Zoom
              : Slide
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
