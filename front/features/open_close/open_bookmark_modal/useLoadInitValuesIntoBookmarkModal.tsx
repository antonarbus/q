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
    const firstBlock = getState().quotation.blocks.at(0)

    if (firstBlock) {
      nameSignal.value = firstBlock.name ?? ''
      categorySignal.value = firstBlock.category ?? ''
      descSignal.value = firstBlock.desc ?? ''
      infoSignal.value = firstBlock.info ?? ''
    }
  })
}
