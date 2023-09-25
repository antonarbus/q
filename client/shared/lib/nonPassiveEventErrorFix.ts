import { passiveSupport } from 'passive-events-support/src/utils'

passiveSupport({
  debug: false,
  listeners: [
    {
      element: '#items',
      event: 'touchstart',
      // prevented: true, // (optional) will force { passive: false }
    },
    {
      element: '#items',
      event: 'touchmove',
    },
  ],
})
