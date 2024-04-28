import { theme } from '@lib_instances/theme'
import { Avatar } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { CategoryInput } from '@shared/components/CategoryInput'
import { NameInput } from '@shared/components/NameInput'

export const EditItem = (): JSX.Element => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const nameSignal = useSignal('')
  const categorySignal = useSignal('')

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={() => {
        navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title='Save item'
        logo={
          <Avatar
            sx={{ m: 1, bgcolor: theme.colors.darkBackground }}
          >
            <BsBookmarkStar />
          </Avatar>
        }
      >
        <form
          onSubmit={(e: FormEvent): void => {
            e.preventDefault()
            console.log('formValue', { name: nameSignal.value, category: categorySignal.value })
          }}
        >
          <NameInput nameSignal={nameSignal}/>
          <CategoryInput categorySignal={categorySignal}/>

          <ButtonCustom
            disabled={false}
            isPending={false}
            isSuccess={false}
            isError={false}
          >
            SAVE
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
