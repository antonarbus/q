import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

type Word = { key: string; text: string }

export const TestPage = (): React.JSX.Element => {
  const [words, setWords] = useState<Word[]>([])
  const [status, setStatus] = useState<'idle' | 'streaming' | 'done'>('idle')

  const startStream = async (): Promise<void> => {
    setWords([])
    setStatus('streaming')

    const response = await fetch('/api/dev/stream-test')

    if (response.body === null) {
      return
    }

    const decoder = new TextDecoder()

    for await (const chunk of response.body) {
      const text = decoder.decode(chunk)

      for (const line of text.split('\n')) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice('data: '.length)) as { word?: string; done?: boolean }

          if (data.done === true) {
            setStatus('done')
          } else if (data.word !== undefined) {
            setWords((prev) => [...prev, { key: crypto.randomUUID(), text: data.word as string }])
          }
        }
      }
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Button variant='contained' onClick={startStream} disabled={status === 'streaming'}>
        Start Stream
      </Button>

      <Box sx={{ mt: 3, fontSize: 24, minHeight: 40 }}>
        {words.map(({ key, text }) => (
          <span key={key}>{text} </span>
        ))}
      </Box>

      {status === 'done' && <Typography sx={{ mt: 2, color: 'green' }}>Done.</Typography>}
    </Box>
  )
}
