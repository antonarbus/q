import { removeItemMsg } from 'client/entities/items'
import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { useUpdateEffect } from 'react-use'

interface IProps {
  index: number
}

export const Msg = ({ index }: IProps): JSX.Element => {
  const dispatch = useDispatchTyped()
  const msg = useSelectorTyped(state => state.items[index]?.msg)

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
