type Slide = {
  step: string
  title: string
  description: string
  mockLabel: string
  image?: string
}

export const welcomeSlides: Slide[] = [
  {
    step: 'Step 1 of 4',
    title: 'A client needs a quote.',
    description:
      'Anna is renovating her apartment and needs a new electricity distribution box installed. She messages John. He needs to send a professional quote.',
    mockLabel: '[ editor view ]',
    image: '/welcome-guide/welcome-slide-01.jpeg',
  },
  {
    step: 'Step 2 of 4',
    title: 'Write a pitch that wins the job.',
    description:
      'John adds a cover letter — rich text, photos, portfolio link. Everything the client needs to say yes.',
    mockLabel: '[ block editor ]',
    image: '/welcome-guide/welcome-slide-02.png',
  },
  {
    step: 'Step 3 of 4',
    title: 'Break down the price. Build the trust.',
    description:
      'John adds a scope of supply — every item, quantity, and unit price listed clearly. No surprises for the client, no disputes after the job.',
    mockLabel: '[ scope of supply ]',
    image: '/welcome-guide/welcome-slide-03.png',
  },
  {
    step: 'Step 4 of 4',
    title: 'Get Paid',
    description:
      'Add a Stripe payment block. Clients pay directly from the quotation — no separate invoicing needed.',
    mockLabel: '[ payment block ]',
  },
]
