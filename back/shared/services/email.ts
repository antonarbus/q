import { getEnvVarOrThrow } from '@back/shared/utils/getEnvVar'
import sgMail, { type MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(getEnvVarOrThrow('SENDGRID_API_KEY'))

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
      from: 'info@sendmequotation.today',
      replyTo: 'anton.arbus@gmail.com',
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
