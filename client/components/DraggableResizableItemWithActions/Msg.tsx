import { useSelectorTyped } from 'client/store'

type Props = {
  index: number
}

export const Msg = ({ index }: Props) => {
  const msg = useSelectorTyped(state => state.items[index]?.msg)

  if (!msg) return null

  return (
    <span
      css={{
        position: 'absolute',
        top: 5,
        right: 10,
        fontSize: 10,
        color: '#b7b7b7',
        fontWeight: 500,
        userSelect: 'none'
      }}
    >
      {msg}
    </span>
  )
}
