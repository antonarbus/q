import { Key } from 'client/components/Key'

export const PressEsc = () => {
  return (
    <div
        css={{
          textAlign: 'center',
          color: 'grey',
          fontSize: '12px',
          marginBottom: '10px'
        }}
      >
        Press <Key>Esc</Key> to exit
      </div>
  )
}
