/* eslint-disable @typescript-eslint/strict-void-return */
import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { useGetBookmarkListQuery } from '@entity/bookmark/api/useGetBookmarkListQuery'
import { useIsCopyModalVisible } from '@entity/copy/useIsCopyModalVisible'
import { Autocomplete, Box } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { cls } from '@shared/cls'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { useSelector } from '@shared/lib/redux'
import { useEffect } from 'react'
import { OptionItemCategory } from './OptionItemCategory'
import { OptionItemDescription } from './OptionItemDescription'
import { OptionItemName } from './OptionItemName'
import { PaperComponent } from './PaperComponent'
import { renderInput } from './renderInput'
import { useCopyBookmarkAtSearch } from '@feature/bookmark/copy-bookmark/useCopyBookmarkAtSearch'

export const Search = (): React.JSX.Element => {
  const getBookmarkListQuery = useGetBookmarkListQuery()
  const options = getBookmarkListQuery.data?.bookmarkList ?? []
  const inputValueSignal = useSignal('')
  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      void getBookmarkListQuery.refetch()
    }
  }, [email])

  const isAutocompleteOpen = useSignal(false)
  const isCopyModalVisible = useIsCopyModalVisible()

  const copyBookmarkAtSearch = useCopyBookmarkAtSearch({
    onClose: () => {
      isAutocompleteOpen.value = false
    },
  })

  return (
    <Autocomplete
      className={cls.search}
      clearOnBlur
      clearOnEscape
      disablePortal
      disabled={isCopyModalVisible}
      freeSolo={options.length !== 0} // show MUI autocomplete even if no options
      getOptionLabel={(option: string | ResBody['bookmarkList'][number]) => {
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
        _props: React.HTMLAttributes<HTMLLIElement>,
        option: ResBody['bookmarkList'][number],
      ): React.JSX.Element => {
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
              ...(copyBookmarkAtSearch.isPending === false && {
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
            onClick={async (event: React.MouseEvent): Promise<void> => {
              await copyBookmarkAtSearch.mutateAsync({
                bookmarkId: option.id,
                cursorPos: {
                  x: event.clientX,
                  y: event.clientY,
                },
              })
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

            {copyBookmarkAtSearch.isPending &&
            option.id === copyBookmarkAtSearch.bookmarkId ? (
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
