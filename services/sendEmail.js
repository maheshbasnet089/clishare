const nodemailer = require('nodemailer')

const sendEmail = async (data)=>{
   const transporter =  nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'dptest1230@gmail.com',
            pass : 'bdratcozuytvjwws'
        }
    })
    const mailOptions = {
        from : "CliShare<dptest1230@gmail.com>",
        to : data.gmail,
        subject : data.subject,
        text : data.message,
        attachments : data.files
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail