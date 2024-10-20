import { setup } from 'xstate'

/** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCBLAdlABFgMao4B0A7ulgC65QDEsN6ATjfmpvQNoAMAXUSgADqli0spYSAAeiAKwAWAJxkVAZg0AOBQEYNqvSoBM2gDQgAnoj3aTZEyqUB2JcqV8VANhNuAvv6WXNh4hCTkIfQMMBxgrKyorPxCSCBiEnTSafIIGr5k9nx6JnZ22oYu3pY2CHreZAoKKnza2i4mfFqaLgqBwRihBMSkZFF4MWAcsACuRERwsCkyGZLZoLkuenrqLXoK+Qbe3u01tg1NLW0dXRo9fUEg48MRZPGJrAyyzOg0YGToABmf1YAApOnw+ABKBjPcKjd5JZZpVZZHAyXJONQtJoHJQGLQuCzWRB+BraPhE-EdBTHbwPAbcMIjcizeaLL4-P4A4HxcGQ6Gwwb0eGsuYLWBLQQrcRrdE5RDafGNZQuFSmWl6XpKM4IEzeNQaUqubYqPSqFSBR44VAQOAyOEsmWZKTyjak-TqPi4wwEjREjS6gC0Lj4ZCqOhMTXcTj4rn6T2FzNeVEkeGdcoxik6ZH9xwUcZUWwpel1ZhcZD0cfqBdrReUCcdr2eGbRWYQClD4YpJhMd229lOJLy2nU+mOLjV+xKGj0jaTLwRCSSrdd7dnGnUMcn3js7m01WHZXUvlDSjaSi02nN86Zi7F7Mlq-WckVl9zRpKX+arh1R+vJ5+HGF5XjeVpAA */
export const loadingIconMachine = setup({
  types: {
    events: {} as
      | { type: 'start loading' }
      | { type: 'get error' }
      | { type: 'get success' },
  },
  actions: {
    'disable click': () => {
      console.info('disable click')
    },
    'show error icon': () => {
      console.info('show error icon')
    },
    'show success icon': () => {
      console.info('show success icon')
    },
    'show spinner': () => {
      console.info('show spinner')
    },
    'show initial icon': () => {
      console.info('show initial icon')
    },
  },
}).createMachine({
  id: 'loading icon',
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        'start loading': {
          target: 'loading',
        },
      },
      entry: [
        {
          type: 'show initial icon',
        },
      ],
      exit: [
        {
          type: 'show spinner',
        },
      ],
    },
    loading: {
      on: {
        'get error': {
          target: 'error',
          actions: [
            {
              type: 'show error icon',
            },
          ],
        },
        'get success': {
          target: 'success',
          actions: [
            {
              type: 'show success icon',
            },
          ],
        },
      },
    },
    error: {
      after: {
        2000: {
          target: 'waiting',
        },
      },
      // exit: [
      //   {
      //     type: 'show initial icon',
      //   },
      // ],
    },
    success: {
      after: {
        2000: {
          target: 'waiting',
        },
      },
    },
  },
})
