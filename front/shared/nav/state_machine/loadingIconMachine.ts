import { createMachine } from 'xstate'

export const loadingIconMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCBLAdlAkgMao4B0A7ulgC65QDEsAFquQARqZ1tbE4DaABgC6iUAAdUsGlhJiQAD0QAWABwBOUgHYATMoBsOgMyr9Jo8oCsAGhABPRAEZVO0jvXKtR-Y-eD9-joAvkG2nNh4RCSk4XSMLOxgAE5JqEk8fEKiSCCS0rRyOUoI3q6qlqrO+lpaglqWRka2DiWqpOqqqkaCyo4BlpYe+iFhGBEEfDFjccysbLAAroSEcBkkWfJ5MoWgxYaWpEYDRzqD3YZN9ogm7Z3dvf2DViMgsZGTyalJ9Aqw1OjUMCkdAAM0BSQAFDpBDCAJT0N4TaKfNIbHJbAo4eTFUqkVQw-SqLQ+dSOdTqHRaZqIdyaRyCdx6HT6fSDDovRFRMiLZZwWA-P4AoGg8FQmGCeGcyY8lawWBoiRSbZYoqIfTqIykBqkqwGdQs7zUkr+LXqQTmZR6AxHEKhEA4VAQODyKU7XJKzHYmnudoBNTQ5QGQQDI0AWjUpBZLOUwZc1S8wztrrIlBkeE2HtkKt2iAaB30lvUWl6pME+scRvcWjctSZZg6Vi0HOm72iiIz+SzXoQlh9+qJZlUylJWl8RpurMMulJFW8+ubXFbZBRSQ7yu7lOr+p6Lh6QZDVwQzkcvspO6HjUqC-GXNIMr5a89qoQ9TaGk8o7JPj6RuPp9qagXiYji2kEQA */
  id: 'loadingIcon',
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
        'show succes icon': {
          target: 'success',
        },
      },
    },
    error: {
      after: {
        2000: {
          target: 'waiting',
        },
      },
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
