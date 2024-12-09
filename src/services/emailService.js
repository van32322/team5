require('dotenv').config()
const nodemailer = require('nodemailer')
let sendSimpleEmail = async(dataSend)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Tranvi 👻" <vit76404@gmail.com>', // sender address
          to:dataSend.reciverEmail, // list of receivers
          subject: "Thông tin đặt lịch khám bệnh", // Subject line // plain text body
          html: `<h3>xin chào ${dataSend.patientName}!</h3>
          <p>Bạn nhận được email này vì ddaxddawjt lịch khám bjeenh online trên medicalApppointment</p>
          <p> Thông tin đặt lịch khám bệnh:</p>
          <div><b>thời gian:${dataSend.time}</b></div>
           <div><b>Bác sĩ:${dataSend.doctorName}</b></div>
           
           <p>Nếu các thông tin trên là đúng sự thật,vui lòng click vào đường link bên dưới để hoàn tát thủ tục đặt lịch khám bệnh </p>
           <div>
           <a href=${dataSend.redirectLink} target="_blank">Click here</a>
           </div>
           
           <div>xin chân thành cảm ơn</div>
           `, // html body
        });
    }
module.exports={
    sendSimpleEmail
}