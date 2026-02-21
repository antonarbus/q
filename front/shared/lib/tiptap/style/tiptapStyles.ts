import type { CSSObject } from '@mui/material'
import { cls } from '@shared/cls'

type NestedCSSObject = CSSObject & Record<`&${string}`, CSSObject>

// Custom SVG resize cursors for cross-browser compatibility (Safari lacks standard resize cursors)
// cspell:disable-next-line
const diagonalNwSe = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <path d="M3 3l10 10M3 7V3h4M13 9v4H9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 3l10 10M3 7V3h4M13 9v4H9" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

// cspell:disable-next-line
const diagonalNeSw = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <path d="M13 3L3 13M9 3h4v4M7 13H3V9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 3L3 13M9 3h4v4M7 13H3V9" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

const resizeCursor = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}") 8 8, auto !important`

export const tiptapStyles: NestedCSSObject = {
  // Remove default focus outline
  '& .tiptap:focus': {
    outline: 'none',
  },
  // Placeholder styling
  '& .tiptap p.is-editor-empty:first-of-type::before': {
    color: 'rgb(173, 181, 189)',
    content: 'attr(data-placeholder)',
    display: 'block',
    height: 0,
    pointerEvents: 'none',
  },

  '& img': {
    borderRadius: '4px',
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

  // Table styles
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0.5em 0',
    overflow: 'hidden',
  },
  '& th, & td': {
    border: '1px solid #d0d0d0',
    padding: '6px 10px',
    minWidth: '80px',
    verticalAlign: 'top',
    position: 'relative',
  },
  '& th': {
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
  },
  '& .selectedCell': {
    backgroundColor: 'rgba(200, 200, 255, 0.3)',
  },
  '& .column-resize-handle': {
    position: 'absolute',
    right: -2,
    top: 0,
    bottom: -2,
    width: 4,
    backgroundColor: '#adf',
    pointerEvents: 'none',
  },
  '& .tableWrapper': {
    overflowX: 'auto',
  },

  // YouTube embed
  '& div[data-youtube-video]': {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0,
    },
  },

  // Upload button: hidden by default, shown on hover
  [`& .${cls.tiptapInsertButton}`]: {
    opacity: 0,
    pointerEvents: 'none' as const,
  },
  [`&:hover .${cls.tiptapInsertButton}`]: {
    opacity: 1,
    pointerEvents: 'auto' as const,
  },

  // Inline code
  '& :not(pre) > code': {
    backgroundColor: '#f4f4f5',
    borderRadius: '3px',
    padding: '1px 4px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#4f4f4f',
  },

  // Code block
  '& pre': {
    backgroundColor: '#f4f4f5',
    borderRadius: '4px',
    padding: '2px 6px',
    margin: '5px 0',
    overflowX: 'auto',
  },
  '& pre code': {
    background: 'none',
    padding: 0,
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#4f4f4f',
  },

  // Blockquote
  '& blockquote': {
    borderLeft: '3px solid #d0d0d0',
    margin: '0.5em 0',
    paddingLeft: '1em',
    color: '#666666',
    fontStyle: 'italic',
  },

  // Lists
  '& ::marker': {
    color: '#666666',
    fontSize: '15px',
  },
}
