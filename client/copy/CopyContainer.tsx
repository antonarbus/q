import { useSelectorTyped } from 'client/store'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'
import parseHtml from 'html-react-parser'
import { motion } from 'framer-motion'
import { PressEsc } from './PressEsc'
import hash from 'object-hash'
import { useRef } from 'react'

let scaleFactorForFirstItem: number
const containerWidth = 200
const containerPadding = 20

export const CopyContainer = () => {
  useCloseOnEsc()
  const ref = useRef()
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 600, y: 0 }
  const { items } = useSelectorTyped(state => state.copy)

  return (
    <motion.div
      ref={ref}
      initial={{ height: ref?.current?.offsetHeight }}
      animate={{ height: 'auto' }}
      transition={{ delay: 0, duration: 1, type: 'spring' }}
      key={hash(items)}
      css={{
        width: containerWidth,
        borderRadius: 6,
        position: 'fixed',
        zIndex: 2,
        top: y + 15,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
      }}
    >
      <div
        // this container is needed to have a gap at the bottom
        css={{
          overflow: 'hidden',
          maxHeight: 300,
          marginBottom: 10
        }}
      >
        <div
          // this container is needed for main container height animation
          // need to get padding out of the parent container and put here to animate the height
          css={{
            padding: containerPadding,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: 300,
          }}
        >
          <PressEsc />
          {items.map((item, index) => {
            scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / parseInt(item.width)

            if (index === 0) {
              return (
                <motion.div
                  key={`copy el ${items.length - index}`}
                  initial={{ y: '-100vh' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3, duration: 1, type: 'spring' }}
                  css={{
                    height: item.height * scaleFactorForFirstItem,
                    width: item.width * scaleFactorForFirstItem,
                  }}
                >
                  <div
                    css={{
                      background: 'white',
                      borderRadius: '6px',
                      boxShadow: '#00000033 0px 0px 12px 2px',
                      padding: '20px',
                      marginBottom: '5px',
                      width: item.width,
                      transformOrigin: 'left top',
                      scale: `${scaleFactorForFirstItem}`,
                      position: 'relative'
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
              gap: '10px',
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
                    position: 'relative',
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
                      scale: `${scaleFactor}`,
                    }}
                  >
                    {parseHtml(item.innerHtml)}
                  </div>
                </div>
              )
            })}

          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
