import { useSelectorTyped } from '@lib_instances/store'
import { Autocomplete } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useEffect } from 'react'
import { useCopyBookmarkAtSearch } from '@features/bookmark/copy_bookmark'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { cls } from '@shared/consts/cls'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'
import { renderOption } from './renderOption'

export const Search = (): JSX.Element => {
  const { data: bookmarksData, isPending: isPendingBookmarks, refetch: fetchBookmarks } = useGetBookmarksQuery()
  const email = useSelectorTyped(state => state.user.email)
  const options = bookmarksData?.documents ?? []
  const inputValueSignal = useSignal('')
  const { loadBookmark, isPendingBookmark, pendingBookmarkId } = useCopyBookmarkAtSearch()

  useEffect(() => {
    if (email) {
      void fetchBookmarks()
    }
  }, [email])

  return (
    <Autocomplete
      // open // manual open control to see for dev purpose
      className={cls.search}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      disablePortal
      popupIcon={null}
      clearOnBlur
      clearOnEscape
      loading={isPendingBookmarks}
      loadingText={email ? 'Loading...' : 'Not logged in...'}
      noOptionsText='No saved bookmarks'
      options={options}
      inputValue={inputValueSignal.value}
      onInputChange={(event, newInputValue) => {
        inputValueSignal.value = newInputValue
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        return option.name + option.category + option.desc
      }}
      renderInput={renderInput}
      renderOption={renderOption({ loadBookmark, inputValueSignal, isPendingBookmark, pendingBookmarkId })}
      PaperComponent={PaperComponent}
      componentsProps={{ popper: { sx: { zIndex: 3 } } }}
      sx={{
        position: 'relative',
        width: '300px',
        zIndex: 0,
        translate: '0px 5px',
      }}
    />
  )
}
