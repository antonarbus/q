import { useSelectorTyped } from 'client/store'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'
import parseHtml from 'html-react-parser'
import { motion } from 'framer-motion'
import { PressEsc } from './PressEsc'
import hash from 'object-hash'

// it looks like in .map only new key is animated
// we need to animate new coming from the top
// but also animate existing ones down
// some container for existing ones to be created and it should change its key when item is added
// probably hash the array may help

let scaleFactorForFirstItem: number

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
        overflow: 'hidden',
        gap: '10px'
      }}
    >
      <PressEsc />
      {items.map((item, index) => {
        scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / parseInt(item.width)

        if (index === 0) {
          return (
            <motion.div
              key={`copy el ${items.length - index}`}
              initial={{ y: '-400%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 1, type: 'spring' }}
              css={{
                height: item.height * scaleFactorForFirstItem,
                width: item.width * scaleFactorForFirstItem,
                // overflow: 'hidden'
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
                  scale: `${scaleFactorForFirstItem}`
                }}
              >
                {parseHtml(item.innerHtml)}
              </div>
            </motion.div>
          )
        }
        return null
      })}

      <motion.div
        initial={{ y: -items[0].height * scaleFactorForFirstItem }}
        animate={{ y: 0 }}
        transition={{ delay: 0, duration: 1, type: 'spring' }}
        key={hash(items)}
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {items.map((item, index) => {
          const scaleFactor = (containerWidth - 2 * containerPadding) / parseInt(item.width)
          if (index === 0) return null
          return (
            <div
              key={`copy el ${items.length - index}`}
              css={{
                height: item.height * scaleFactor,
                width: item.width * scaleFactor,
                // overflow: 'hidden'
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
      </motion.div>

    </div>
  )
}
