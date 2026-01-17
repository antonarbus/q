import { type JSX, useRef, useState, useLayoutEffect } from 'react'
import { useEditorRef } from '@udecode/plate/react'

const bubbleMenuStyle: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  padding: '6px 8px',
  backgroundColor: '#1f2937',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 50,
}

const buttonStyle: React.CSSProperties = {
  padding: '4px 8px',
  border: 'none',
  borderRadius: 4,
  backgroundColor: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
  minWidth: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const dividerStyle: React.CSSProperties = {
  width: 1,
  height: 20,
  backgroundColor: '#4b5563',
  margin: '0 4px',
}

type Position = { top: number; left: number } | null

export const PlateBubbleMenu = (): JSX.Element | null => {
  const editor = useEditorRef()
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>(null)

  useLayoutEffect(() => {
    const updatePosition = (): void => {
      const domSelection = window.getSelection()

      const isCollapsedOrEmpty =
        domSelection === null ||
        domSelection.rangeCount === 0 ||
        domSelection.isCollapsed === true

      if (isCollapsedOrEmpty === true) {
        setPosition(null)

        return
      }

      const range = domSelection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const editorEl = document.querySelector('[data-plate-editor]')

      if (editorEl === null) {
        setPosition(null)

        return
      }

      // Check if selection is inside the editor
      const isInsideEditor = editorEl.contains(range.commonAncestorContainer)

      if (isInsideEditor === false) {
        setPosition(null)

        return
      }

      const editorRect = editorEl.getBoundingClientRect()
      const menuWidth = menuRef.current?.offsetWidth ?? 250

      setPosition({
        top: rect.top - editorRect.top - 45,
        left: rect.left - editorRect.left + rect.width / 2 - menuWidth / 2,
      })
    }

    document.addEventListener('selectionchange', updatePosition)
    updatePosition()

    return (): void => {
      document.removeEventListener('selectionchange', updatePosition)
    }
  }, [])

  if (position === null) {
    return null
  }

  const toggleMark = (mark: string): void => {
    // @ts-expect-error - Plate editor has these methods but types are incomplete
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const marks: Record<string, boolean> = editor.getMarks() ?? {}
    const isActive = marks[mark] === true

    if (isActive === true) {
      // @ts-expect-error - Plate editor has these methods but types are incomplete
      editor.removeMark(mark)
    } else {
      // @ts-expect-error - Plate editor has these methods but types are incomplete
      editor.addMark(mark, true)
    }
  }

  return (
    <div
      ref={menuRef}
      style={{ ...bubbleMenuStyle, top: position.top, left: position.left }}
    >
      <button
        type='button'
        style={buttonStyle}
        onClick={() => {
          toggleMark('bold')
        }}
      >
        <strong>B</strong>
      </button>
      <button
        type='button'
        style={buttonStyle}
        onClick={() => {
          toggleMark('italic')
        }}
      >
        <em>I</em>
      </button>
      <button
        type='button'
        style={buttonStyle}
        onClick={() => {
          toggleMark('underline')
        }}
      >
        <u>U</u>
      </button>
      <button
        type='button'
        style={buttonStyle}
        onClick={() => {
          toggleMark('strikethrough')
        }}
      >
        <s>S</s>
      </button>
      <div style={dividerStyle} />
      <button
        type='button'
        style={buttonStyle}
        onClick={() => {
          toggleMark('highlight')
        }}
      >
        <span style={{ backgroundColor: '#fef08a', padding: '0 2px' }}>H</span>
      </button>
    </div>
  )
}
