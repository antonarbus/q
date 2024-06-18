import sgMail, { type MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

type Props = {
  to: MailDataRequired['to']
  subject: string
  html: string
}

export const sendEmail = async ({
  to,
  subject,
  html,
}: Props): Promise<[sgMail.ClientResponse, unknown] | undefined> => {
  try {
    const sendEmailRes = await sgMail.send({
      from: 'info@quotation.app',
      replyTo: 'info@quotation.app',
      to,
      subject,
      html,
    })

    return sendEmailRes
  } catch (error) {
    // todo: log error to some system
    console.error(error)
    return undefined
  }
}
