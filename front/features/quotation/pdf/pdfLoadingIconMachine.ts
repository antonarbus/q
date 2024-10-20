import { dispatch } from '@lib_instances/store'
import { setup } from 'xstate'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'

/** @xstate-layout N4IgpgJg5mDOIC5QAcIDMAEAbA9gQwgEsA7KDQgYx2IDoB3PQgFxKgGJYALHO7fI0uSrEA2gAYAuohQ5YzQtWkgAHogCsARgCcNACxbdADi0aAzADYA7KbOGANCACeibRpqbTAJjWnrptYY+ngC+wQ6omLgErELUNFEC7Fw8GGAATmk4abGikkrIsvKKSCqIpmJiNJaBumJqlmoVjboOzgiW5jQW+paWYtpaxiah4eh80YKUcQmsHNy8sACuFBRwsDniUiUFcizFoKrt5VW9Gp6eGvWeuvqtiB1d5j19A0MaIyAR44k5NOmZaTYylgTDwTDANDwaHBaQAFJ4KmIAJRsL4zSbCP4ZLKbfKFPbEJSHUxedy6cw2QwaMTmQy6Tz2JyIBk6WlaMSmXRqNQ3MSWEJhT5jdFkKa0JYrNZAkFgiFQmHwxEotH8GJimgS1awWC47b4hSEkqHDo6a6WMxnPxqLR3BAsmhsjlcnm1fmhQXEHAQOD5YWqjH7T76wOHa66B3mcyXHndTRWW0AWg01IdJkMVN5-jEnksHxVE1FmIY8lIeN2BqJ6mtNGMahztXJGnJLSZCBspi65U8nPKybpujzfoLvxFZaKhoO6jEOl0Gisll0-P59cT3cexisJMM5tnT0HkX9hbi-yyY4JlbtWk8Eaj3N0sY0lltl3DHTp1q59NMVP33zVmM1NYzwrI17hpGgtHNQx+n6fxF1MZ8eSqWkuQMHlux-d0gA */
export const pdfLoadingIconMachine = setup({
  types: {
    events: {} as
      | { type: 'show loading icon' }
      | { type: 'show error icon' }
      | { type: 'show success icon' },
  },
  actions: {
    'show spinner': () => {
      dispatch(
        navSlice.actions.startLoadingIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
    'hide spinner': () => {
      dispatch(
        navSlice.actions.stopLoadingIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
    'show error icon': () => {
      dispatch(
        navSlice.actions.showErrorIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
    'hide error icon': () => {
      dispatch(
        navSlice.actions.hideErrorIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
    'show success icon': () => {
      dispatch(
        navSlice.actions.showSuccessIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
    'hide success icon': () => {
      dispatch(
        navSlice.actions.hideSuccessIcon({
          navMenuItemIdKey: navItemKey.pdf,
        }),
      )
    },
  },
}).createMachine({
  id: 'pdf loading icon',
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        'show loading icon': {
          target: 'loading',
        },
      },
    },
    loading: {
      on: {
        'show error icon': {
          target: 'error',
        },
        'show success icon': {
          target: 'success',
        },
      },
      entry: 'show spinner',
      exit: 'hide spinner',
    },
    error: {
      after: {
        2000: {
          target: 'waiting',
        },
      },
      entry: [
        {
          type: 'show error icon',
        },
      ],
      exit: [
        {
          type: 'hide error icon',
        },
      ],
    },
    success: {
      after: {
        2000: {
          target: 'waiting',
        },
      },
      entry: [
        {
          type: 'show success icon',
        },
      ],
      exit: [
        {
          type: 'hide success icon',
        },
      ],
    },
  },
})
