import parseHtml from 'html-react-parser'
import hash from 'object-hash'
import { motion } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, marginBottomForRestOfItems } from './CopyContainer'

export const RestOfCopiedItems = () => {
  const items = useSelectorTyped(state => state.copy.items)
  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

  return (
    <motion.div
      initial={{ y: -items[0].height * scaleFactorForFirstItem }}
      animate={{ y: marginBottomForRestOfItems }}
      transition={{ delay: 0, duration: 1, type: 'spring' }}
      key={hash(items)}
      css={{
      }}
    >
      {items.map((item, index) => {
        const scaleFactor = (containerWidth - 2 * containerPadding) / item.width

        if (index === 0) return null

        return (
          <div
            key={`copy el ${items.length - index}`}
            css={{
              height: item.height * scaleFactor,
              width: item.width * scaleFactor,
              marginBottom: marginBottomForRestOfItems
            }}
          >
            <div
              css={{
                background: 'white',
                borderRadius: 6,
                boxShadow: '#00000033 0px 0px 10px 0px',
                padding: 20,
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
  )
}
