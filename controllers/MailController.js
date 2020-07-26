const sendEmail = require('../utils/SendEmail')

exports.mail = async (req, res, next) => {
  const { name, email, message } = req.body

  let errorObject = []

  if (!name) {
    errorObject.push({ "name": "First name is required" })
  } else if (name.length < 3 || name.length > 15) {
    errorObject.push({ "name": "Name must be between 3 and 15 characters" })
  }

  let regex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if (!regex.test(email)) {
    errorObject.push({ "email": "Please enter a valid email" })
  }

  if (!message) {
    errorObject.push({ "message": "Message is required" })
  } else if (message.length < 20 || message.length > 200) {
    errorObject.push({ "message": "Message must be between 20 and 200 characters" })
  }


  if (errorObject.length > 0) {
    return res.status(400).json(errorObject)
  }


  try {
    await sendEmail({
      subject: 'Message from Portfolio Danny',
      name,
      email,
      message
    })
  } catch (error) {
    console.error(`Server Error`);
    console.error(error)
    return res.status(500).json({
      msg: error
    })
  }

  res.status(200).json({
    msg: 'msg sent successfully',
    name,
    email,
    message
  })


}
