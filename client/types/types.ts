import { Resizable } from 're-resizable'

export type Event =
  | KeyboardEvent
  | MouseEvent
  | React.MouseEvent
  | React.KeyboardEvent
  | React.FormEvent
export type Children = React.ReactNode
export type RefDiv = React.MutableRefObject<HTMLDivElement>
export type RefSpan = React.MutableRefObject<HTMLSpanElement>
export type RefString = React.MutableRefObject<string>
export type RefAny = React.MutableRefObject<any>
export type RefResizable = React.MutableRefObject<Resizable>
