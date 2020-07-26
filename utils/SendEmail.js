const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  })

  var fs = require('fs')
  var template = fs.readFileSync(__dirname + `/../email_templates/index.html`, { encoding: 'utf-8' })
  template = template.replace('*NAME', options.name)
  template = template.replace('*EMAIL', options.email)
  template = template.replace('*MESSAGE', options.message)
  const htmlObject = template



  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
    to: process.env.TO_EMAIL, // list of receivers
    subject: options.subject, // Subject line
    html: htmlObject
  }

  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);

}

module.exports = sendEmail