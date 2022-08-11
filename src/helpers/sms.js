const axios = require("axios")
const FormData = require("form-data");

const auth = async () => {
    const email = "test@eskiz.uz";
    const password = "j6DWtQjjpLDNjWEk74Sx";

    const response = await axios.post('https://notify.eskiz.uz/api/auth/login', {
            email,
            password
    });

    return response.data.data.token
}
// 45-46
const sendSms = async (phone, code) => {
   try  {
       const token = await auth();
       console.log(token)
       const formdata = new FormData();

       formdata.append("mobile_phone", phone)
       formdata.append("message", `registratsiya uchun tasdiqlash kodi ${code}`)
       formdata.append("from", '4546')

       const response = await axios('https://notify.eskiz.uz/api/message/sms/send', {
           data: formdata,
           headers: {
               "Authorization": 'Bearer ' + token
           },
           method: "POST"
       });

       console.log(response.data)
   } catch (e) {
       console.log(e)
   }
}

module.exports = sendSms
