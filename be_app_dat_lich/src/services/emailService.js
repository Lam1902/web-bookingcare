require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  console.log("check dataSend: ", dataSend);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "21111065131@hunre.edu.vn",
      pass: "19/02/2003@",
    },
  });

  let date = dataSend

  let info = await transporter.sendMail({
    from: "'LamJS' <21111065131@hunre.edu.vn>",
    to: dataSend.receiverEmail,
    subject: "Thông tin lịch khám bệnh",
    html: `
        <h3>Xin chào ${dataSend.patientName},</h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website <b>BookingCare.com</b>. Vui lòng xác nhận thông tin bên dưới để hoàn tất việc đặt lịch khám bệnh:</p>

<p><b>Thông tin chi tiết:</b></p>
<ul>
    <li><b>Thời gian:</b> ${dataSend.time}</li>
    <li><b>Bác sĩ:</b> ${dataSend.doctorName}</li>
    <li><b>Phòng khám:</b> ${dataSend.nameClinic}</li>
    <li><b>Địa chỉ:</b> ${dataSend.addressClinic}</li>
</ul>

<p>Vui lòng nhấn vào liên kết dưới đây để xác nhận và hoàn tất việc đặt lịch khám bệnh:</p>
<p><a href="${dataSend.redirectLink}" target="_blank"><b>Xác nhận đặt lịch khám bệnh</b></a></p>

<p>Sau khi xác nhận, bạn sẽ nhận được thông tin chi tiết về lịch khám bệnh của mình. Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

<p>Chúng tôi rất mong được phục vụ bạn và hy vọng bạn sẽ có trải nghiệm tốt nhất khi sử dụng dịch vụ của chúng tôi.</p>

<p>Trân trọng,</p>
<p>Đội ngũ BookingCare</p>
<p>Email: support@bookingcare.com</p>
<p>Điện thoại: 0123 456 789</p>

        `,
  });
};

module.exports = {
  sendSimpleEmail,
};
