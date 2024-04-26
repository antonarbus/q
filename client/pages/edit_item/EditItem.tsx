import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { MdOutlineCategory, MdSaveAlt } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemsQuery } from '@entities/item'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { EmailInput, PasswordInput } from '@shared/components'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { CategoryInput } from '@shared/components/CategoryInput'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

export const EditItem = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const inputRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const emailSignal = useSignal('')
  const passwordSignal = useSignal('')
  const isEmailOkSignal = useSignal(false)

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
            <MdSaveAlt />
          </Avatar>
        }
      >
        <form
          onSubmit={(e: FormEvent): void => {
            e.preventDefault()
            alert('save item')
          }}
        >
          <EmailInput
            inputRef={inputRef}
            emailSignal={emailSignal}
            isEmailOkSignal={isEmailOkSignal}
          />
          <CategoryInput />
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
