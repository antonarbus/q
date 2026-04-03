import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
}

export const saveBlockHeightByIndex = (props: Props): void => {
  const paperElements = document.querySelectorAll(`.${cls.paper}`)
  const paperElement = paperElements[props.blockIndex]

  if (paperElement === undefined) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updateBlockHeight({
      blockIndex: props.blockIndex,
      height: paperElement.clientHeight,
    }),
  )
}
