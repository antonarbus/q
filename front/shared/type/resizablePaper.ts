import type { NumberSize } from 're-resizable'
import type { Direction } from 're-resizable/lib/resizer'
import type { MouseEvent, TouchEvent } from 'react'

// Note: re-resizable library passes React synthetic events with Element generic type
// to all resize callbacks, despite inconsistent type definitions in the library

export type OnBlockResizeStop = (params: {
  event: MouseEvent | TouchEvent
  direction: Direction
  elementRef: HTMLElement
  delta: NumberSize
  blockIndex: number
}) => void

export type OnBlockResize = (params: {
  event: MouseEvent | TouchEvent
  direction: Direction
  elementRef: HTMLElement
  delta: NumberSize
  blockIndex: number
}) => void

export type OnBlockResizeStart = (params: {
  event: MouseEvent | TouchEvent
  dir: Direction
  elementRef: HTMLElement
  blockIndex: number
}) => void
