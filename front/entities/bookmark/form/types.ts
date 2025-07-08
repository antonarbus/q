import type { Signal } from '@preact/signals-react'

export type BookmarkFormValues = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}
