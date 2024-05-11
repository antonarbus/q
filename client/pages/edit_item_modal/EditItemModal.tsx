import { getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { Avatar, Box, DialogContent, FormControl, FormLabel, InputAdornment, InputLabel, TextField } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import type { FormEvent } from 'react'
import { useRef } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { PiBooks } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { FirstItemOnly } from '@widgets/items/FirstItemOnly'
import { useGetItemCategoriesQuery, useGetItemsQuery, useSaveItemMutation } from '@entities/item'
import { type Copyable } from '@entities/quotation'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'
import { CardCustom } from '@shared/components/CardCustom'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'
import { CategoryAutocomplete } from './CategoryAutocomplete'
import { DescriptionTextarea } from './DescriptionTextarea'
import { NameInput } from './NameInput'

export const EditItemModal = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const item = location.state.item as Copyable | undefined
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
      <CardCustom
        reference={cardRef}
        title='Edit item'
        cssProps={{
          width: '500px',
        }}
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }} >
            <FiEdit3 />
          </Avatar>
        }
      >
        <form
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflow: 'auto',
              maxHeight: 'calc(100vh - 400px)',
              padding: '10px',
            }}
          >

            <NameInput nameSignal={nameSignal}/>
            <CategoryAutocomplete categorySignal={categorySignal}/>
            <DescriptionTextarea descSignal={descSignal} />

            <Box
              sx={{
                position: 'relative',
                borderRadius: '4px',
                border: '1px solid #ccc',
                ':hover': {
                  border: '1px solid #333',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  left: 0,
                  top: 0,
                  transformOrigin: 'top left',
                  translate: '7px -10px',
                  scale: '0.75',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: '1.4375em',
                  letterSpacing: '0.00938em',
                  userSelect: 'none',
                  background: 'white',
                  paddingInline: '8px',
                }}
              >
                Item
              </Box>
              <Box
                sx={{
                  overflow: 'auto',
                  margin: '10px',
                  // maxHeight: '200px',
                  '.items': {
                    maxWidth: 'none !important',
                  },
                }}
              >
                <FirstItemOnly />
              </Box>
            </Box>
          </Box>

          <ButtonCustom
            disabled={isDisabled}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
          >
            UPDATE
          </ButtonCustom>
        </form>
      </CardCustom>
    </BackdropWithSlidableContent>
  )
}
