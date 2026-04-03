import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { useGetBookmarkListQuery } from '@front/entities/bookmark/api/useGetBookmarkListQuery'
import { Autocomplete } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux'
import { useEffect, useState } from 'react'
import { PaperComponent } from './PaperComponent'
import { SearchOption } from './SearchOption'
import { renderInput } from './renderInput'
import { useCopyBookmarkAtSearch } from '@front/features/bookmark/copy-bookmark/useCopyBookmarkAtSearch'

export const Search = (): React.ReactNode => {
  const getBookmarkListQuery = useGetBookmarkListQuery()
  const options = getBookmarkListQuery.data?.bookmarkList ?? []
  const [inputValue, setInputValue] = useState('')
  const email = reduxHolder.useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      getBookmarkListQuery.refetch()
    }
  }, [email])

  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false)

  const isCopyModalVisible = reduxHolder.useSelector((state) => state.copy.isVisible)

  const copyBookmarkAtSearch = useCopyBookmarkAtSearch()

  const isPreviewPreparing = reduxHolder.useSelector((state) => state.copy.isPreviewPreparing)

  const isLoading = copyBookmarkAtSearch.isPending === true || isPreviewPreparing === true

  return (
    <Autocomplete
      open={isAutocompleteOpen}
      onOpen={() => {
        setIsAutocompleteOpen(true)
      }}
      onClose={() => {
        setIsAutocompleteOpen(false)
      }}
      className={cls.search}
      clearOnBlur
      clearOnEscape
      disablePortal
      disabled={isCopyModalVisible}
      // show MUI autocomplete even if no options
      freeSolo={options.length > 0}
      loading={getBookmarkListQuery.isPending}
      loadingText={email === null ? 'Not logged in' : 'Loading...'}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      getOptionLabel={(option: string | ResBody['bookmarkList'][number]) => {
        if (typeof option === 'string') {
          return option
        }

        return option.name + option.category + option.desc
      }}
      noOptionsText='No saved bookmarks'
      options={options}
      popupIcon={null}
      renderInput={renderInput}
      renderOption={(
        _props: React.HTMLAttributes<HTMLLIElement>,
        option: ResBody['bookmarkList'][number],
      ): React.JSX.Element => {
        return (
          <SearchOption
            key={option.id}
            inputValue={inputValue}
            option={option}
            isLoading={isLoading === true && option.id === copyBookmarkAtSearch.bookmarkId}
            onClick={async (event: React.MouseEvent): Promise<void> => {
              await copyBookmarkAtSearch.mutateAsync({
                bookmarkId: option.id,
                cursorPos: {
                  x: event.clientX,
                  y: event.clientY,
                },
              })

              setIsAutocompleteOpen(false)
            }}
          />
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
