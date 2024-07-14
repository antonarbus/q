import type { NumberSize } from 're-resizable'
import type { Direction } from 're-resizable/lib/resizer'

export type OnItemResizeStop = (params: {
  e: MouseEvent | TouchEvent
  direction: Direction
  elementRef: HTMLElement
  delta: NumberSize
  blockIndex: number
}) => void

export type OnItemResize = (params: {
  e: MouseEvent | TouchEvent
  direction: Direction
  elementRef: HTMLElement
  delta: NumberSize
  blockIndex: number
}) => void

export type OnItemResizeStart = (params: {
  e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  dir: Direction
  elementRef: HTMLElement
  blockIndex: number
}) => void
