import type { Resizable } from 're-resizable'

export type Event = KeyboardEvent | MouseEvent | React.FormEvent | React.KeyboardEvent | React.MouseEvent
export type RefDiv = React.MutableRefObject<HTMLDivElement>
export type RefSpan = React.MutableRefObject<HTMLSpanElement>
export type RefString = React.MutableRefObject<string>
export type RefAny = React.MutableRefObject<any>
export type RefResizable = React.MutableRefObject<Resizable>
