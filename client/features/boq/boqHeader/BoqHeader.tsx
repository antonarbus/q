import { theme } from 'client/theme'
import { BoqHeaderTitle } from './BoqHeaderTitle'
import { BoqHeaderSubtotal } from './BoqHeaderSubtotal'
import { store } from 'client/store'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeader = ({ index }: TProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { height } = item.boq.header

  return (
    <div
      ref={ref}
      className='boq-header'
      style={{
        height: height || 'auto',
      }}
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '10px',
        background: '#343434e6',
        padding: '10px 15px',
        color: theme.colors.greyFont,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
      onFocus={() => {
        if (!ref.current) return
        ref.current.style.removeProperty('height')
      }}
    >
      <BoqHeaderTitle index={index} />
      <BoqHeaderSubtotal index={index} />
    </div>
  )
}
