import { removeItemMsg } from 'client/features/items/itemsSlice'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useUpdateEffect } from 'react-use'

type Props = {
  index: number
}

export const Msg = ({ index }: Props) => {
  const dispatch = useDispatchTyped()
  const msg = useSelectorTyped(state => state.items[index]?.msg)
  // const { msg } = item

  useUpdateEffect(function hideMsg() {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(removeItemMsg({ index }))
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
