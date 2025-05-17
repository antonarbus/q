import { Autocomplete } from '@mui/material'
import { cls } from '@shared/consts/cls'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'
import { renderOption } from './renderOption'
import { useEffect } from 'react'
import { useSelector } from '@shared/lib/redux'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { useSignal } from '@preact/signals-react'
import { useCopyBookmarkAtSearch } from '@features/bookmark/copy_bookmark'
import { useIsCopyModalVisible } from '@entities/copy'

export const Search = (): React.JSX.Element => {
  const {
    data: bookmarksData,
    isPending: isPendingBookmarks,
    refetch: fetchBookmarks,
  } = useGetBookmarksQuery()

  const options = bookmarksData?.bookmarks ?? []

  const { loadBookmark, isPendingBookmark, pendingBookmarkId } =
    useCopyBookmarkAtSearch()

  const inputValueSignal = useSignal('')

  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      void fetchBookmarks()
    }
  }, [email])

  const isAutocompleteOpen = useSignal(false)

  const isCopyModalVisible = useIsCopyModalVisible()

  return (
    <Autocomplete
      open={isAutocompleteOpen.value}
      onOpen={() => (isAutocompleteOpen.value = true)}
      onClose={() => (isAutocompleteOpen.value = false)}
      disabled={isCopyModalVisible}
      className={cls.search}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      disablePortal
      popupIcon={null}
      clearOnBlur
      clearOnEscape
      loading={isPendingBookmarks}
      loadingText={email === null ? 'Not logged in :(' : 'Loading...'}
      noOptionsText='No saved bookmarks'
      options={options}
      inputValue={inputValueSignal.value}
      onInputChange={(event, newInputValue) => {
        inputValueSignal.value = newInputValue
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        }

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
      slots={{
        paper: PaperComponent,
      }}
      slotProps={{
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
