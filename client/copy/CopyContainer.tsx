import { useSelectorTyped } from 'client/store'
import { useCursorCords } from './useCursorCords'
import parseHtml from 'html-react-parser'
import { motion } from 'framer-motion'
import { PressEsc } from './PressEsc'
import hash from 'object-hash'
import { useRef } from 'react'
import { usePasteCords } from './usePasteCords'

const containerWidth = 200
const containerPadding = 20

export const CopyContainer = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const { x, y } = useCursorCords()
  // const { x, y } = { x: 600, y: 0 }
  const { items } = useSelectorTyped(state => state.copy)
  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / parseInt(items[0].width)
  usePasteCords()

  return (
    <motion.div
      ref={ref}
      initial={{ height: ref?.current?.offsetHeight }}
      animate={{ height: 'auto' }}
      transition={{ delay: 0, duration: 1.1, type: 'spring' }}
      key={hash(items)}
      css={{
        width: containerWidth,
        borderRadius: 6,
        position: 'fixed',
        zIndex: 3,
        top: y + 15,
        left: x + 15,
        background: 'white',
        boxShadow: '#00000033 0px 0px 10px 0px',
        // overflow: 'visible'
      }}
    >
      <div
        // div is needed to have a gap at the bottom
        // otherwise overflow: hidden trims the content without a gap, looks terrible
        css={{
          overflow: 'hidden',
          maxHeight: 300,
          marginBottom: 10
        }}
      >
        <div
          // div is needed for main container height animation
          // moved padding here from the main container, otherwise height is animated badly
          css={{
            padding: containerPadding,
            paddingBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: 300,
          }}
        >
          <PressEsc />

          {/* first item slides down */}
          <motion.div
            key={`copy el ${items.length}`}
            initial={{ y: '-500px' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            css={{
              height: items[0].height * scaleFactorForFirstItem,
              width: parseInt(items[0].width) * scaleFactorForFirstItem,
            }}
          >
            <div
              css={{
                background: 'white',
                borderRadius: '6px',
                boxShadow: '#00000033 0px 0px 12px 2px',
                padding: '20px',
                marginBottom: '5px',
                width: items[0].width,
                transformOrigin: 'left top',
                scale: `${scaleFactorForFirstItem}`,
                position: 'relative'
              }}
            >
              {parseHtml(items[0].innerHtml)}
            </div>
          </motion.div>

          {/* rest of items slides down */}
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
                    width: parseInt(item.width) * scaleFactor,
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
