import { passiveSupport } from 'passive-events-support/src/utils'

// https://stackoverflow.com/questions/59282213/react-warning-non-passive-event-listener-to-a-scroll-blocking-touchstart

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
    {
      element: '#boq-rows',
      event: 'touchstart',
      // prevented: true, // (optional) will force { passive: false }
    },
    {
      element: '#boq-rows',
      event: 'touchmove',
    },
  ],
})
