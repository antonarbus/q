import { Autocomplete } from '@mui/material'
import { cls } from '@shared/consts/cls'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'
import { renderOption } from './renderOption'
import { useEffect } from 'react'
import { useSelectorTyped } from '@lib_instances/store'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { useSignal } from '@preact/signals-react'
import { useCopyBookmarkAtSearch } from '@features/bookmark/copy_bookmark'

export const Search = (): JSX.Element => {
  const {
    data: bookmarksData,
    isPending: isPendingBookmarks,
    refetch: fetchBookmarks,
  } = useGetBookmarksQuery()

  const options = bookmarksData?.bookmarks ?? []

  const { loadBookmark, isPendingBookmark, pendingBookmarkId } =
    useCopyBookmarkAtSearch()

  const inputValueSignal = useSignal('')

  const email = useSelectorTyped((state) => state.user.email)

  useEffect(() => {
    if (email) {
      void fetchBookmarks()
    }
  }, [email])

  const isAutocompleteOpen = useSignal(false)

  const isCopyContainer = useSelectorTyped(
    (state) => state.copy.isCopyContainer,
  )

  return (
    <Autocomplete
      open={isAutocompleteOpen.value}
      onOpen={() => (isAutocompleteOpen.value = true)}
      onClose={() => (isAutocompleteOpen.value = false)}
      disabled={isCopyContainer}
      className={cls.search}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      disablePortal
      popupIcon={null}
      clearOnBlur
      clearOnEscape
      loading={isPendingBookmarks}
      loadingText={email ? 'Loading...' : 'Not logged in :('}
      noOptionsText='No saved bookmarks'
      options={options}
      inputValue={inputValueSignal.value}
      onInputChange={(event, newInputValue) => {
        inputValueSignal.value = newInputValue
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        return (
          (option.name ?? '') + (option.category ?? '') + (option.desc ?? '')
        )
      }}
      renderInput={renderInput}
      renderOption={renderOption({
        loadBookmark,
        inputValueSignal,
        isPendingBookmark,
        pendingBookmarkId,
        isAutocompleteOpen,
      })}
      PaperComponent={PaperComponent}
      componentsProps={{
        popper: {
          sx: {
            zIndex: 3,
          },
        },
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
