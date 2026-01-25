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
}
