import nodemailer from 'nodemailer'

type Props = {
  to: string
  subject: string
  html: string
}

export const sendMail = async ({ to, subject, html }: Props): Promise<void> => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount()

  const port =
    typeof process.env.SMTP_PORT === 'string'
      ? parseInt(process.env.SMTP_PORT)
      : 587

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      // https://stackoverflow.com/questions/72626410/how-do-i-send-email-from-nodemailer-in-nodejs-using-gmail
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Sherb 👻" <sherbsherb@gmail.com>', // sender address, like
    to, // list of receivers, like 'anton.arbus@gmail.com, 3007887@gmail.com'
    subject, // Subject line
    text: '', // plain text body
    html, // html body
  })

  console.info('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.info('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
