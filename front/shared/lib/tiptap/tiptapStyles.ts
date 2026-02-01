import type { CSSObject } from '@mui/material'

// Custom SVG resize cursors for cross-browser compatibility (Safari lacks standard resize cursors)
// cspell:disable-next-line
const diagonalNwSe =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">' +
  '<path d="M3 3l10 10M3 7V3h4M13 9v4H9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M3 3l10 10M3 7V3h4M13 9v4H9" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>'

// cspell:disable-next-line
const diagonalNeSw =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">' +
  '<path d="M13 3L3 13M9 3h4v4M7 13H3V9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M13 3L3 13M9 3h4v4M7 13H3V9" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>'

const resizeCursor = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}") 8 8, auto !important`

export const tiptapStyles: CSSObject = {
  // Remove default focus outline
  '& .tiptap:focus': {
    outline: 'none',
  },
  // Placeholder styling
  '& .tiptap p.is-editor-empty:first-of-::before': {
    color: 'rgb(173, 181, 189)',
    content: 'attr(data-placeholder)',
  },

  // Image resize handles
  '& [data-resize-handle]': {
    width: 8,
    height: 8,
    background: '#3b82f6',
    borderRadius: '50%',
    opacity: 0,
    transition: 'opacity 0.2s',
    pointerEvents: 'auto',
  },
  '& [data-resize-wrapper]:hover [data-resize-handle]': {
    opacity: 1,
  },
  '& [data-resize-handle="top-left"]': {
    cursor: resizeCursor(diagonalNwSe),
    top: '-4px !important',
    left: '-4px !important',
  },
  '& [data-resize-handle="top-right"]': {
    cursor: resizeCursor(diagonalNeSw),
    top: '-4px !important',
    right: '-4px !important',
  },
  '& [data-resize-handle="bottom-left"]': {
    cursor: resizeCursor(diagonalNeSw),
    bottom: '0px !important',
    left: '-4px !important',
  },
  '& [data-resize-handle="bottom-right"]': {
    cursor: resizeCursor(diagonalNwSe),
    bottom: '0px !important',
    right: '-4px !important',
  },

  // Let clicks on the empty space of the container pass through to the editor
  // so only clicking the actual image selects the image node
  '& [data-resize-container]': {
    pointerEvents: 'none',
  },
  '& [data-resize-wrapper]': {
    pointerEvents: 'auto',
    minWidth: 30,
  },

  // Prevent image stretching when container resizes
  '& [data-resize-container] img': {
    maxWidth: '100%',
    height: 'auto !important',
    minWidth: 30,
  },

  // Upload button: hidden by default, shown on hover
  '& .tiptap-upload-button': {
    opacity: 0,
    pointerEvents: 'none',
  },
  '&:hover .tiptap-upload-button': {
    opacity: 1,
    pointerEvents: 'auto',
  },
}
