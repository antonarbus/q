import { getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar, Box, Typography } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { FirstItem } from '@widgets/items/FirstItem'
import { useGetItemCategoriesQuery, useGetItemsQuery, useSaveItemMutation } from '@entities/item'
import { type Item } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const EditItemModal = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state.item as Item | undefined
  const cardRef = useRef<HTMLDivElement>(null)

  const nameSignal = useSignal(item?.name ?? '')
  const categorySignal = useSignal(item?.category ?? '')
  const descSignal = useSignal(item?.desc ?? '')

  const { mutate: saveItem, data, isSuccess, isPending, isError, error, reset } = useSaveItemMutation()
  const { refetch: updateItemCategories } = useGetItemCategoriesQuery()
  const { refetch: updateItems } = useGetItemsQuery()

  const isDisabled = nameSignal.value === '' || categorySignal.value === ''

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({ msg: 'Saved', type: 'success', theme: 'dark', position: 'bottom-center' })
      } else if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'info', theme: 'dark', position: 'bottom-center' })
      }

      void updateItemCategories()
      void updateItems()

      setTimeout(() => {
        slideElement({
          element: cardRef.current,
          onSlide: () => {
            navigate('..', { replace: true, state: nanoid() })
          },
        })
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'dark', position: 'bottom-center' })
      reset()
    }
  }, [isError])

  return (
    <BackdropWithSlidableContent
      onSlideIn={() => {
        /* inputRef.current.focus() */
      }}
      onSlideOut={() => {
        navigate('..')
      }}
    >
      <Box
        ref={cardRef}
        onMouseDown={(e: MouseEvent): void => {
          e.stopPropagation()
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 64px)',
          maxWidth: 'calc(100vw - 64px)',
          minWidth: '300px',
          width: '500px',
          background: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
          borderRadius: '4px',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          boxShadow:
            '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
          overflowY: 'hidden',
          '&:hover, &:focus-within': {
            boxShadow:
              '0px 11px 15px -7px rgb(0 0 0 / 40%), 0px 24px 38px 3px rgb(0 0 0 / 28%), 0px 9px 46px 8px rgb(0 0 0 / 24%)',
          },
        }}
      >
        <Box
          className='card-header'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 20px 10px 20px',
            borderBottom: '1px solid rgb(223, 223, 223)',
            backgroundColor: '#80808017',
          }}
        >
          <Avatar sx={{ bgcolor: theme.colors.darkBackground }}>
            <FiEdit3 />
          </Avatar>
          <Typography component='h1' variant='h6' >
            Edit item
          </Typography>
        </Box>

        <Box
          className='card-content'
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '40px 50px',
            backgroundColor: '#8080800f',
            overflowY: 'auto',
          }}
          onSubmit={(e: FormEvent): void => {
            e.preventDefault()

            const email = getState().user.email

            if (!email) {
              notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
              return
            }

            if (!item) return

            const itemWithUpdatedValues = {
              ...item,
              name: nameSignal.value,
              category: categorySignal.value,
              desc: descSignal.value,
            }

            saveItem({ item: itemWithUpdatedValues })
          }}
        >
          <NameInput nameSignal={nameSignal}/>
          <CategoryAutocomplete categorySignal={categorySignal}/>
          <DescriptionTextarea descSignal={descSignal} />
          <FirstItem />
        </Box>

        <Box
          className='card-footer'
          sx={{
            display: 'flex',
            padding: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid rgb(223, 223, 223)',
            backgroundColor: '#80808017',
          }}
        >
          <ButtonCustom
            disabled={isDisabled}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            sx={{
              width: '200px',
            }}
          >
            UPDATE
          </ButtonCustom>
        </Box>

      </Box>
    </BackdropWithSlidableContent>
  )
}
