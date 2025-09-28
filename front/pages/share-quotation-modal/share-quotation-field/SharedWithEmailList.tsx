import type { AccessFormValuesSignal } from '@entities/quotation'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Box, Chip } from '@mui/material'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const SharedWithEmailList = (props: Props): ReactNode => {
  const [chipsParent] = useAutoAnimate()

  if (props.accessFormValuesSignal.value.level !== 'custom') {
    return null
  }

  if (props.accessFormValuesSignal.value.userList.length === 0) {
    return null
  }

  return (
    <Box
      animate={{
        height: 'auto',
        opacity: 1,
      }}
      component={motion.div}
      exit={{
        height: 0,
        opacity: 0,
      }}
      initial={{
        height: 0,
        opacity: 0,
      }}
      key='emails-chips'
      ref={chipsParent}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row-reverse',
      }}
    >
      {props.accessFormValuesSignal.value.userList.map((email) => {
        return (
          <Chip
            key={email}
            label={email}
            onDelete={() => {
              const userListWithoutDeletedItem =
                props.accessFormValuesSignal.value.userList.filter(
                  (emailInArray) => emailInArray !== email,
                )

              props.accessFormValuesSignal.value = {
                level: props.accessFormValuesSignal.value.level,
                userList: userListWithoutDeletedItem,
              }
            }}
            sx={{
              width: 'min-content',
              margin: '2px',
              fontSize: '12px',
            }}
          />
        )
      })}
    </Box>
  )
}
