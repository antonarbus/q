import sgMail from '@sendgrid/mail'

type Props = {
  to: string
  subject: string
  html: string
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const sendEmail = async ({
  to,
  subject,
  html,
}: Props): Promise<[sgMail.ClientResponse, unknown] | undefined> => {
  const sgMailRes = await sgMail.send({
    from: 'info@quotation.app',
    to,
    subject,
    html,
  })

  return sgMailRes
}
