import { useSelectorTyped } from 'client/store'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'
import parseHtml from 'html-react-parser'
import { Key } from 'client/components/Key'

// calc width and height of scaled el,
// add a container with same dimensions
// and then put scaled content there

export const CopyContainer = () => {
  useCloseOnEsc()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 600, y: 0 }
  const { items } = useSelectorTyped(state => state.copy)
  const containerWidth = 300
  const containerPadding = 20

  return (
    <div
      css={{
        width: containerWidth,
        height: 600,
        borderRadius: 6,
        position: 'fixed',
        zIndex: 2,
        top: y + 15,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: containerPadding,
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
      {items.map((item, index) => {
        // console.log(260 / parseInt(item.width))
        const scaleFactor = (containerWidth - 2 * containerPadding) / parseInt(item.width)

        return item.type === 'text' && (
          <div
            key={`copy el ${index}`}
            css={{
              height: item.height * scaleFactor,
              width: item.width * scaleFactor,
              border: '1px solid red'
            }}
          >
            <div
              css={{
                background: 'white',
                borderRadius: '6px',
                boxShadow: '#00000033 0px 0px 10px 0px',
                padding: '20px',
                marginBottom: '5px',
                width: item.width,
                transformOrigin: 'left top',
                scale: `${scaleFactor}`
              }}
            >
              {parseHtml(item.innerHtml)}
            </div>
          </div>

        )
      })}
    </div>
  )
}
