import type { ReqBody as Payload } from '@back/api/user/deleteUserHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { toast } from 'sonner'
import { useDeleteUserMutation } from '@entities/user'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/consts/queryKey'

export const DeleteUserButton = ({ email }: Payload): React.ReactNode => {
  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteUserMutation()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      void instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getUsers],
      })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)

      void instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getUsers],
      })
    }
  }, [isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Delete'
    >
      <IconButton
        onClick={() => {
          // Step 1: Initial confirmation
          const askInitialConfirmation = (): boolean => {
            const areYouSure = confirm('Are you sure?')

            return areYouSure
          }

          // Step 2: Solve a simple math question
          const checkMathAnswer = (): boolean => {
            const answer = prompt('What is 2 + 3?')
            const isCorrectAnswer = answer === '5'

            return isCorrectAnswer
          }

          // Step 3: Final irrecoverable action confirmation
          const askFinalConfirmation = (): boolean =>
            confirm('This action is irrecoverable, are you really sure?')

          if (askInitialConfirmation() === false) {
            return
          }

          if (checkMathAnswer() === false) {
            return
          }

          if (askFinalConfirmation() === false) {
            return
          }

          deleteUser({ email })
        }}
        size='small'
      >
        {isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
