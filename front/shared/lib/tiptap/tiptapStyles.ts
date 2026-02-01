import type { CSSObject } from '@mui/material'

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
    cursor: 'nw-resize !important',
    top: '-4px !important',
    left: '-4px !important',
  },
  '& [data-resize-handle="top-right"]': {
    cursor: 'ne-resize !important',
    top: '-4px !important',
    right: '-4px !important',
  },
  '& [data-resize-handle="bottom-left"]': {
    cursor: 'sw-resize !important',
    bottom: '0px !important',
    left: '-4px !important',
  },
  '& [data-resize-handle="bottom-right"]': {
    cursor: 'se-resize !important',
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
