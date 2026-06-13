import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

type Word = { key: string; text: string }

type StreamEvent = { word?: string; done?: boolean }

const isStreamEvent = (data: unknown): data is StreamEvent => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const hasValidWord = !('word' in data) || typeof data.word === 'string'
  const hasValidDone = !('done' in data) || typeof data.done === 'boolean'

  return hasValidWord && hasValidDone
}

export const TestPage = (): React.JSX.Element => {
  const [words, setWords] = useState<Word[]>([])
  const [status, setStatus] = useState<'idle' | 'streaming' | 'done'>('idle')

  const handleStreamLine = (line: string): void => {
    if (!line.startsWith('data: ')) {
      return
    }

    const data: unknown = JSON.parse(line.slice('data: '.length))

    if (!isStreamEvent(data)) {
      return
    }

    if (data.done === true) {
      setStatus('done')
    } else if (data.word !== undefined) {
      const { word } = data

      setWords((prev) => [...prev, { key: crypto.randomUUID(), text: word }])
    }
  }

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

      text.split('\n').forEach((line) => {
        handleStreamLine(line)
      })
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant='contained'
        onClick={() => void startStream()}
        disabled={status === 'streaming'}
      >
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
