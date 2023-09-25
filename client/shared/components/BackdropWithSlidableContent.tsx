import { slideElement } from 'client/shared/lib/slideElement'
import { useLayoutEffect, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  children?: React.ReactNode
  content?: React.ReactNode
  color?: string
  onSlideIn?: () => void
  onSlideOut?: () => void
}

/**
 * Dark transparent div with slidable into view content on mount and slidable out view on mouse click or esc button
 */

export const BackdropWithSlidableContent = ({
  children,
  content,
  onSlideIn,
  onSlideOut,
}: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) return

    slideElement({
      intoView: true,
      element: contentRef.current,
      cb: () => {
        onSlideIn?.()
      },
    })
  }, [])

  useEffectOnce(() => {
    const slideAway = (e: KeyboardEvent): void => {
      if (!contentRef.current) return
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
        if (!contentRef.current) return
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
