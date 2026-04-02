import { useMemo } from 'react'
import type { Props } from './types'
import { BlockContext } from './BlockContext'

export const BlockProvider = (props: Props): React.JSX.Element => {
  const blockContextData = useMemo(() => {
    const contextData = {
      index: props.index,
      item: props.item,
    }

    return contextData
  }, [props.index, props.item])

  return <BlockContext.Provider value={blockContextData}>{props.children}</BlockContext.Provider>
}
