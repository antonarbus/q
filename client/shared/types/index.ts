export type { IPasteItem } from './Item'
export type { TItem } from './Item'
export type { TPastePos } from './Copy'
export type { ICopyPlace } from './Copy'
export type { TCopyItem } from './Copy'

import type { Resizable } from 're-resizable'

export type Event = KeyboardEvent | MouseEvent | React.FormEvent | React.KeyboardEvent | React.MouseEvent
export type RefDiv = React.MutableRefObject<HTMLDivElement>
export type RefSpan = React.MutableRefObject<HTMLSpanElement>
export type RefString = React.MutableRefObject<string>
export type RefResizable = React.MutableRefObject<Resizable>
