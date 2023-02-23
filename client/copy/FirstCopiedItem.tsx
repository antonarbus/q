import parseHtml from 'html-react-parser'
import { motion } from 'framer-motion'
import { useSelectorTyped } from 'client/store'
import { containerPadding, containerWidth, itemMarginBottom } from './CopyContainer'

export const FirstCopiedItem = () => {
  const items = useSelectorTyped(state => state.copy.items)

  if (!items.length) return null

  const scaleFactorForFirstItem = (containerWidth - 2 * containerPadding) / items[0].width

  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      key={`copy el ${items.length}`}
      css={{
        height: items[0].height * scaleFactorForFirstItem,
        width: items[0].width * scaleFactorForFirstItem,
        marginTop: 15,
        marginBottom: itemMarginBottom
      }}
    >
      <div
        css={{
          background: 'white',
          borderRadius: 6,
          boxShadow: '#00000033 0px 0px 12px 2px',
          padding: 20,
          marginBottom: 5,
          width: items[0].width,
          transformOrigin: 'left top',
          scale: `${scaleFactorForFirstItem}`,
        }}
      >
        {parseHtml(items[0].innerHtml)}
      </div>
    </motion.div>
  )
}
