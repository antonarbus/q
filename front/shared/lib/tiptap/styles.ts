import type { CSSObject } from '@mui/material'

export const tiptapStyles: CSSObject = {
  position: 'relative',
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
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  '& [data-resize-wrapper]:hover [data-resize-handle]': {
    opacity: 1,
  },
  '& [data-resize-handle="top-left"], & [data-resize-handle="bottom-right"]': {
    cursor: 'nwse-resize',
  },
  '& [data-resize-handle="top-right"], & [data-resize-handle="bottom-left"]': {
    cursor: 'nesw-resize',
  },

  // Prevent image stretching when container resizes
  '& [data-resize-container] img': {
    maxWidth: '100%',
    height: 'auto !important',
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
