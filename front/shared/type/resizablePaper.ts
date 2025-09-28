import type { NumberSize } from 're-resizable'
import type { Direction } from 're-resizable/lib/resizer'
import type { MouseEvent, TouchEvent } from 'react'

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
  event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  dir: Direction
  elementRef: HTMLElement
  blockIndex: number
}) => void
