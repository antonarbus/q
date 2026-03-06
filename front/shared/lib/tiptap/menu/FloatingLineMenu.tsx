import { useTiptap } from '@tiptap/react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import { InsertTableButton } from './button/InsertTableButton'
import { YouTubeButton } from './button/YouTubeButton'
import { HorizontalRuleButton } from './button/HorizontalRuleButton'
import { InsertLinkButton } from './button/InsertLinkButton'
import { UploadFileButton } from './button/UploadFileButton'
import { TiptapMenuLayout } from '../style/TiptapMenuLayout'
import { ButtonsGroupLayout } from '../style/ButtonsGroupLayout'

export const FloatingLineMenu = (): React.ReactNode => {
  const { editor } = useTiptap()
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const preventHideRef = useRef(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const hideMenu = useCallback((): void => {
    setPos(null)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    let animFrameId: number | null = null

    const updatePos = (): void => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId)
      }

      animFrameId = requestAnimationFrame(() => {
        animFrameId = null

        const { isDestroyed, isFocused } = editor

        const shouldHideEarly = isDestroyed || isFocused === false

        if (shouldHideEarly === true) {
          hideMenu()

          return
        }

        const { $from, empty } = editor.state.selection
        const isInTable = editor.isActive('table')
        const isInImage = editor.isActive('image')
        const isAtRootDepth = $from.depth === 1

        const shouldHide =
          empty === false || isAtRootDepth === false || isInTable || isInImage

        if (shouldHide === true) {
          hideMenu()

          return
        }

        const node = $from.node()

        const isEmptyParagraph =
          node.type.name === 'paragraph' && node.content.size === 0

        if (isEmptyParagraph === false) {
          hideMenu()

          return
        }

        const { pos: fromPos } = $from
        const coords = editor.view.coordsAtPos(fromPos)

        const elementNearWhichToShowMenu =
          editor.view.dom.closest(`.${cls.row}`) === null
            ? editor.view.dom.closest(`.${cls.paper}`)
            : editor.view.dom.closest(`.${cls.block}`)

        const blockElementRect =
          elementNearWhichToShowMenu?.getBoundingClientRect()

        if (blockElementRect === undefined) {
          hideMenu()

          return
        }

        setPos({
          top: (coords.top + coords.bottom) / 2,
          left: blockElementRect.left,
        })
      })
    }

    const onBlur = (): void => {
      if (preventHideRef.current === true) {
        preventHideRef.current = false

        return
      }

      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId)
        animFrameId = null
      }

      hideMenu()
    }

    editor.on('selectionUpdate', updatePos)
    editor.on('update', updatePos)
    editor.on('focus', updatePos)
    editor.on('blur', onBlur)
    window.addEventListener('scroll', updatePos, { capture: true })

    return (): void => {
      editor.off('selectionUpdate', updatePos)
      editor.off('update', updatePos)
      editor.off('focus', updatePos)
      editor.off('blur', onBlur)
      window.removeEventListener('scroll', updatePos, { capture: true })

      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId)
      }
    }
  }, [editor, hideMenu])

  // Close expanded menu on outside click
  useEffect(() => {
    if (isOpen === false) {
      return
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target instanceof Node ? event.target : null

      const isInsideMenu =
        target !== null && menuRef.current?.contains(target) === true

      if (isInsideMenu === false) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return (): void => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  if (pos === null) {
    return null
  }

  return createPortal(
    <div
      ref={menuRef}
      onMouseDown={(): void => {
        preventHideRef.current = true
      }}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        // keep right edge flush to paper; content expands leftward via row-reverse
        transform: 'translateX(calc(-100% - 8px)) translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {/* Trigger: subtle "+" that reveals buttons */}
      <Box
        component='button'
        type='button'
        onMouseDown={(event: React.MouseEvent): void => {
          event.preventDefault()
        }}
        onClick={(): void => {
          setIsOpen((prev) => prev === false)
        }}
        sx={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,0,0,0.2)',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          flexShrink: 0,
          fontSize: 16,
          lineHeight: 1,
          color: 'black',
          opacity: isOpen === true ? 0.8 : 0.35,
          transition: 'opacity 0.15s, color 0.15s',
          ':hover': {
            opacity: 0.7,
            color: 'rgba(0,0,0,0.6)',
          },
        }}
      >
        +
      </Box>

      {/* Expanded buttons, grow to the left of "+" */}
      {isOpen === true && (
        <TiptapMenuLayout>
          <ButtonsGroupLayout>
            <InsertTableButton />
            <YouTubeButton />
            <HorizontalRuleButton />
            <InsertLinkButton />
            <UploadFileButton />
          </ButtonsGroupLayout>
        </TiptapMenuLayout>
      )}
    </div>,
    document.body,
  )
}
