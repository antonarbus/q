import { useGetBookmarkListQuery } from '@entities/bookmark'
import { useIsCopyModalVisible } from '@entities/copy'
import { useCopyBookmarkAtSearch } from '@features/bookmark/copy-bookmark'
import { Autocomplete } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { cls } from '@shared/const/cls'
import { useSelector } from '@shared/lib/redux'
import { type JSX, useEffect } from 'react'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'
import { renderOption } from './renderOption'

export const Search = (): JSX.Element => {
  const getBookmarkListQuery = useGetBookmarkListQuery()

  const options = getBookmarkListQuery.data?.bookmarks ?? []

  const { loadBookmark, isPendingBookmark, pendingBookmarkId } =
    useCopyBookmarkAtSearch()

  const inputValueSignal = useSignal('')

  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      void getBookmarkListQuery.refetch()
    }
  }, [email])

  const isAutocompleteOpen = useSignal(false)

  const isCopyModalVisible = useIsCopyModalVisible()

  return (
    <Autocomplete
      className={cls.search}
      clearOnBlur
      clearOnEscape
      disablePortal
      disabled={isCopyModalVisible}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      getOptionLabel={(option) => {
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
      renderOption={renderOption({
        loadBookmark,
        inputValueSignal,
        isPendingBookmark,
        pendingBookmarkId,
        isAutocompleteOpen,
      })}
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
