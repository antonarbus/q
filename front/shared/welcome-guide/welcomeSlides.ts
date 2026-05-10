export type Slide = {
  step: string
  title: string
  description: string
  mockLabel: string
}

export const welcomeSlides: Slide[] = [
  {
    step: 'Step 1 of 4',
    title: 'Create a Quotation',
    description:
      'Start with a blank editor. Add your company name, client details, and a quotation title.',
    mockLabel: '[ editor view ]',
  },
  {
    step: 'Step 2 of 4',
    title: 'Build with Blocks',
    description:
      'Insert product rows with quantities and prices. Add text blocks for notes and a price summary — totals calculate automatically.',
    mockLabel: '[ block editor ]',
  },
  {
    step: 'Step 3 of 4',
    title: 'Share with Clients',
    description:
      'Generate a read-only share link or download a PDF. Clients can view the quotation without creating an account.',
    mockLabel: '[ share modal ]',
  },
  {
    step: 'Step 4 of 4',
    title: 'Get Paid',
    description:
      'Add a Stripe payment block. Clients pay directly from the quotation — no separate invoicing needed.',
    mockLabel: '[ payment block ]',
  },
]
