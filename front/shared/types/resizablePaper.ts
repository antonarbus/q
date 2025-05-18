import type { NumberSize } from 're-resizable'
import type { Direction } from 're-resizable/lib/resizer'

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
  event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  dir: Direction
  elementRef: HTMLElement
  blockIndex: number
}) => void
