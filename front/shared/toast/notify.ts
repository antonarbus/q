// https://fkhadra.github.io/react-toastify/positioning-toast
import {
  type ToastTransitionProps,
  toast,
  Slide,
  Bounce,
  Flip,
  Zoom,
} from 'react-toastify'

type Props = {
  msg: React.ReactNode | string
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
  const getTransitionType = (): (({
    children,
    position,
    preventExitTransition,
    done,
    nodeRef,
    isIn,
    playToast,
  }: ToastTransitionProps) => React.JSX.Element) => {
    if (transition === 'slide') {
      return Slide
    }

    if (transition === 'bounce') {
      return Bounce
    }

    if (transition === 'flip') {
      return Flip
    }

    if (transition === 'zoom') {
      return Zoom
    }

    return Bounce
  }

  const options = {
    position: position ?? 'top-right',
    autoClose: shouldStay ? false : (closeAfterMs ?? 5000),
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
    transition: getTransitionType(),
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
