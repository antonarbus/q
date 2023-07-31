import { slideElement } from 'utils/slideElement'
import { useLayoutEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import type { RefDiv } from 'client/types'

interface Props {
  children?: React.ReactNode
  content?: React.ReactNode
  color?: string
  onSlideIn?: () => void
  onSlideOut?: () => void
}

/**
 * Dark transparent div with slidable into view content on mount and slidable out view on mouse click or esc button
 * @param props object with parameters
 * @param props.children anything, goes inside tags
 * @param props.content anything, same, but goes as a prop
 * @param props.onSlideIn func called after slide in animation end
 * @param props.onSlideOut func called after slide out animation end
 */

export const BackdropWithSlidableContent = ({
  children,
  content,
  onSlideIn,
  onSlideOut,
}: Props): JSX.Element => {
  const contentRef = useRef() as RefDiv
  useLayoutEffect(() => {
    slideElement({
      intoView: true,
      element: contentRef.current,
      cb: () => {
        onSlideIn?.()
      },
    })
  }, [])

  useEffectOnce(function slideOutOnEscBtn() {
    const slideAway = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        slideElement({
          element: contentRef.current,
          cb: () => {
            onSlideOut?.()
          },
        })
      }
    }

    document.addEventListener('keydown', slideAway)

    return () => {
      document.removeEventListener('keydown', slideAway)
    }
  })

  return (
    <div
      onMouseDown={(): void => {
        slideElement({
          element: contentRef.current,
          cb: () => {
            onSlideOut?.()
          },
        })
      }}
      css={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent',
        zIndex: 1000,
      }}
    >
      {Boolean(children) && <div ref={contentRef}>{children}</div>}
      {Boolean(content) && <div ref={contentRef}>{content}</div>}
    </div>
  )
}
