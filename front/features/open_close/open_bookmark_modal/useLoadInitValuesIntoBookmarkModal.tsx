import { getState } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import type { Signal } from '@preact/signals-react'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}

export const useLoadInitValuesIntoBookmarkModal = ({
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
}: Props): void => {
  useEffectOnce(() => {
    const bookmark = getState().quotation.blocks.at(1000)

    if (bookmark) {
      nameSignal.value = bookmark.name ?? ''
      categorySignal.value = bookmark.category ?? ''
      descSignal.value = bookmark.desc ?? ''
      infoSignal.value = bookmark.info ?? ''
    }
  })
}
