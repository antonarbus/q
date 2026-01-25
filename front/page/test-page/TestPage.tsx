import { useRef, type JSX } from 'react'
import { Tiptap } from './tiptap-example/Tiptap'
import type { Editor } from '@tiptap/react'
import { Box, type CSSObject } from '@mui/material'

const containerStyle: CSSObject = {
  maxWidth: 1200,
  margin: '40px auto',
  padding: '0 20px',
}

const gridStyle: CSSObject = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: 32,
}

const cardStyle: CSSObject = {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}

const titleStyle: CSSObject = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
  color: '#374151',
}

export const TestPage = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)

  return (
    <Box sx={containerStyle}>
      <Box sx={gridStyle}>
        <Tiptap
          editorRef={editorRef}
          className='tip-tap'
          content='hello world'
          onContentChange={(params) => {
            console.log(params.editor.getHTML())
          }}
          sx={{}}
        />
      </Box>
    </Box>
  )
}
