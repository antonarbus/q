import { useMemo } from 'react'
import type { Props } from './types'
import { RowContext } from './RowContext'

export const RowProvider = (props: Props): React.JSX.Element => {
  const rowContextData = useMemo(() => {
    const context = {
      index: props.index,
      item: props.item,
    }

    return context
  }, [props.index, props.item])

  return <RowContext.Provider value={rowContextData}>{props.children}</RowContext.Provider>
}
