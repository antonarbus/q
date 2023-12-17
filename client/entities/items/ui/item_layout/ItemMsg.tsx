import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useSelectorTyped } from 'client/shared/hooks'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { useUpdateEffect } from 'react-use'

export const ItemMsg = (): JSX.Element => {
  const { itemIndex } = useItemIndex()
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)

  useUpdateEffect(() => {
    // hide msg
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemsMsg())
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={{
            position: 'absolute',
            top: -15,
            right: 10,
            fontSize: 10,
            color: '#929292',
            fontWeight: 500,
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
