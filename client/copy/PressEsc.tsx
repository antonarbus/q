import { Key } from 'client/components/Key'
import { HiCursorClick } from 'react-icons/hi'

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
      <HiCursorClick
        css={{
          verticalAlign: 'middle',
          width: '18px',
          height: 'auto',
          position: 'relative',
          top: -1
        }}
      />
      {' '} to paste, <Key>Esc</Key> to exit
      </div>
  )
}
