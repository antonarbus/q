type Slide = {
  step: string
  title: string
  description: string
  mockLabel: string
  image?: string
}

export const welcomeSlides: Slide[] = [
  {
    step: 'Step 1 of 5',
    title: 'A client needs a quote.',
    description:
      'Anna is renovating her apartment and needs a new electricity distribution box installed. She messages John. He needs to send a professional quote.',
    mockLabel: '[ editor view ]',
    image: '/welcome-guide/welcome-slide-01.jpeg',
  },
  {
    step: 'Step 2 of 5',
    title: 'Write a pitch that wins the job.',
    description:
      'John adds a cover letter — rich text, photos, portfolio link. Everything the client needs to say yes.',
    mockLabel: '[ block editor ]',
    image: '/welcome-guide/welcome-slide-02.png',
  },
  {
    step: 'Step 3 of 5',
    title: 'Break down the price. Build the trust.',
    description:
      'John adds a scope of supply — every item, quantity, and unit price listed clearly. No surprises for the client, no disputes after the job.',
    mockLabel: '[ scope of supply ]',
    image: '/welcome-guide/welcome-slide-03.png',
  },
  {
    step: 'Step 4 of 5',
    title: 'Add a payment.',
    description:
      "John sets the payment amount and a label. The client will be able to pay directly from the quotation to John's Stripe account.",
    mockLabel: '[ payment block ]',
    image: '/welcome-guide/welcome-slide-04.png',
  },
  {
    step: 'Step 5 of 5',
    title: 'Send the link. Job booked.',
    description:
      'One click generates a shareable link. John sends it to Anna over WhatsApp. She opens it on her phone, reads the quote, and pays the deposit. Done.',
    mockLabel: '[ share modal ]',
    image: '/welcome-guide/welcome-slide-05.png',
  },
]
