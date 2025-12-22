import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { useGetBookmarkListQuery } from '@entities/bookmark/api/useGetBookmarkListQuery'
import { useGetBookmarkMutation } from '@entities/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entities/copy/copySlice'
import { useIsCopyModalVisible } from '@entities/copy/useIsCopyModalVisible'
import { Autocomplete, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { cls } from '@shared/cls'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { type HTMLAttributes, type JSX, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { OptionItemCategory } from './OptionItemCategory'
import { OptionItemDescription } from './OptionItemDescription'
import { OptionItemName } from './OptionItemName'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'

export const Search = (): JSX.Element => {
  const getBookmarkListQuery = useGetBookmarkListQuery()
  const options = getBookmarkListQuery.data?.bookmarkList ?? []
  const inputValueSignal = useSignal('')
  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      void getBookmarkListQuery.refetch()
    }
  }, [email, getBookmarkListQuery])

  const isAutocompleteOpen = useSignal(false)
  const isCopyModalVisible = useIsCopyModalVisible()
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  return (
    <Autocomplete
      className={cls.search}
      clearOnBlur
      clearOnEscape
      disablePortal
      disabled={isCopyModalVisible}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      getOptionLabel={(option: string | ItemPick) => {
        if (typeof option === 'string') {
          return option
        }

        return (
          (option.name ?? '') + (option.category ?? '') + (option.desc ?? '')
        )
      }}
      inputValue={inputValueSignal.value}
      loading={getBookmarkListQuery.isPending}
      loadingText={email === null ? 'Not logged in :(' : 'Loading...'}
      noOptionsText='No saved bookmarks'
      onClose={() => {
        isAutocompleteOpen.value = false
      }}
      onInputChange={(_event, newInputValue) => {
        inputValueSignal.value = newInputValue
      }}
      onOpen={() => {
        isAutocompleteOpen.value = true
      }}
      open={isAutocompleteOpen.value}
      options={options}
      popupIcon={null}
      renderInput={renderInput}
      renderOption={(
        _props: HTMLAttributes<HTMLLIElement>,
        option: ItemPick,
      ): JSX.Element => {
        return (
          <li
            css={{
              position: 'relative',
              cursor: 'pointer',
              display: 'block',
              borderRadius: '6px',
              padding: '5px !important',
              margin: '2px 4px',
              fontSize: '14px',
              border: '1px solid #ccc',
              ':hover': {
                background: 'rgba(0, 0, 0, 0.05)',
              },
              ...(getBookmarkMutation.isPending === false && {
                ':hover::after': {
                  content: '"Click to copy"',
                  position: 'absolute',
                  fontSize: '10px',
                  top: '2px',
                  right: '5px',
                },
              }),
            }}
            key={option.id}
            onClick={async (event: React.MouseEvent) => {
              const data = await getBookmarkMutation.mutateAsync({
                bookmarkId: option.id,
              })

              isAutocompleteOpen.value = false

              if (data.bookmark !== undefined) {
                const { bookmark: item } = data

                // Save scroll position before setNotEditable
                const { scrollX } = window
                const { scrollY } = window

                dispatch(textSlice.actions.setNotEditable())

                // Restore scroll position after React renders
                requestAnimationFrame(() => {
                  window.scrollTo(scrollX, scrollY)
                })

                dispatch(copySlice.actions.addItem({ item }))
                dispatch(copySlice.actions.allowToPaste())

                dispatch(
                  copySlice.actions.showCopyModal({
                    initCursorPos: { x: event.clientX, y: event.clientY },
                  }),
                )
              }
            }}
          >
            <OptionItemName
              inputValueSignal={inputValueSignal}
              option={option}
            />

            <OptionItemCategory
              inputValueSignal={inputValueSignal}
              option={option}
            />

            <OptionItemDescription
              inputValueSignal={inputValueSignal}
              option={option}
            />

            {getBookmarkMutation.isPending &&
            option.id === getBookmarkMutation.variables.bookmarkId ? (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.05)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RotatingLoaderIcon />
              </Box>
            ) : null}
          </li>
        )
      }}
      slotProps={{
        popper: {
          sx: {
            zIndex: 3,
          },
        },
      }}
      slots={{
        paper: PaperComponent,
      }}
      sx={{
        position: 'relative',
        width: '300px',
        zIndex: 0,
        translate: '0px 5px',
      }}
    />
  )
}
