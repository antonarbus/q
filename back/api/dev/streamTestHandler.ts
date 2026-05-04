import type { Request, Response } from 'express'

export const streamTestHandler = (req: Request, res: Response): void => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const words = [
    'Streaming',
    'is',
    'working!',
    'Each',
    'word',
    'arrives',
    'as',
    'a',
    'separate',
    'chunk.',
  ]

  let index = 0

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ word: words[index] })}\n\n`)
    res.flush()
    index = index + 1

    if (index === words.length) {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      res.flush()
      res.end()
      clearInterval(interval)
    }
  }, 400)

  req.on('close', () => {
    clearInterval(interval)
  })
}
