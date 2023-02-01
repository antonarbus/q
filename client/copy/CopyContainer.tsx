import { useSelectorTyped } from 'client/store'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'
import parseHtml from 'html-react-parser'
import { Key } from 'client/components/Key'

export const CopyContainer = () => {
  useCloseOnEsc()
  const { x, y } = useCursorCords()
  const items = useSelectorTyped(state => state.copy.items)

  return (
    <div
      css={{
        width: '300px',
        height: '600px',
        borderRadius: '6px',
        position: 'fixed',
        zIndex: 2,
        top: y + 15,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
        // gap: '5px'
      }}
    >
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
      {items.map((item, index) => item.type === 'text' && (
        <div
          key={`copy el ${index}`}
          css={{
            background: 'white',
            borderRadius: '6px',
            boxShadow: '#00000033 0px 0px 10px 0px',
            padding: '20px',
            marginBottom: '5px',
            scale: '0.7'
          }}
        >
          {parseHtml(item.innerHtml)}
        </div>
      ))}
    </div>
  )
}
