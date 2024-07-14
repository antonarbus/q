import { dispatch } from '@lib_instances/store'
import { cls } from '@shared/consts/cls'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
}

export const saveBlockHeightByIndex = ({ blockIndex }: Props): void => {
  const paperElements = document.querySelectorAll(`.${cls.paper}`)
  const paperElement = paperElements[blockIndex]

  if (!paperElement) return

  const height = paperElement.clientHeight

  dispatch(
    quotationSlice.actions.updateBlockHeightReducer({
      blockIndex,
      height,
    }),
  )
}
