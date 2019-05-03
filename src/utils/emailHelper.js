import fs from 'fs'
import path from 'path'
import  nodemailer from 'nodemailer'
import config from '../../configs/email.json'
import Log from 'log'
import _  from 'lodash'

// const emailLog = new Log('info', fs.createWriteStream('logs/send_email.log'));

// Api key - api secret
// var Mailjet = require('node-mailjet').connect(config.MAILJET_API_KEY, config.MAILJET_API_SECRET);

// const sendEmail = (emailInfo, data, html = null) => {
//   const mailjet = Mailjet.post('send');
//   let textTemplate, htmlTemplate;
//   try {
//     textTemplate = fs.readFileSync(path.resolve(__dirname, `../templates/${emailInfo.emailTemplate}.txt`), 'utf8');
//     htmlTemplate = html == null ? fs.readFileSync(path.resolve(__dirname, `../templates/${emailInfo.emailTemplate}.html`), 'utf8') : html;
//   } catch (error) {
//     return Promise.reject("Can not load email template")
//   }
//   // console.log("@@@@@@@@@@@@@@@", {htmlTemplate})
//   const emailData = {
//     'FromEmail': config.DEFAULT_EMAIL,
//     'FromName': 'Test',
//     'Subject': emailInfo.subject,
//     // 'Text-part': textTemplate,
//     'Html-part': htmlTemplate,
//     'Recipients': [{'Email': emailInfo.to}],
//     "MJ-TemplateLanguage": true,
//     'Attachments': emailInfo.attachments ? emailInfo.attachments : [],
//     'Vars': data
//   }

//   if(html == null) emailData['Text-part'] = textTemplate;
  
//   return mailjet.request(emailData)
// }

const sendEmailStandard = (senderInfo, data) => {
  console.log(senderInfo)
  let transporter  = nodemailer.createTransport({
    service: 'Gmail',
    // host: 'mail.google.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_FROM_ADDRESS, // generated ethereal user
      pass: config.SMTP_FROM_PASSWORD  // generated ethereal password
    }
  });
  var mailOptions = {
    from: config.SMTP_FROM_ADDRESS,
    to: senderInfo.to,
    subject: senderInfo.subject,
    html: data
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendEmail = (senderInfo, data, dynamicHtml = []) => {
  let textTemplate, htmlTemplate
  try {
    textTemplate = fs.readFileSync(path.resolve(__dirname, `../templates/${senderInfo.emailTemplate}.txt`), 'utf8')
    htmlTemplate = fs.readFileSync(path.resolve(__dirname, `../templates/${senderInfo.emailTemplate}.html`), 'utf8')
    dynamicHtml.forEach(vl => {
      htmlTemplate = htmlTemplate.replace(`{{${vl}}}`, data[vl])
    })
  } catch (error) {
    console.log("Can not load email template", error)
    // emailLog.error("Can not load email template", error)
    return Promise.reject("Can not load email template")
  }
  // let transporter = nodemailer.createTransport(`smtp://${config.SMTP_FROM_ADDRESS}:${config.SMTP_FROM_PASSWORD}@${config.SMTP_SERVER}`)
  let transporter  = nodemailer.createTransport({
    host: config.SMTP_SERVER,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.SMTP_FROM_ADDRESS, // generated ethereal user
        pass: config.SMTP_FROM_PASSWORD  // generated ethereal password
    }
  });
  let sender = transporter.templateSender({
    subject: senderInfo.subject,
    text: textTemplate,
    html: htmlTemplate
  }, {
    from: config.SMTP_FROM_ADDRESS
  })
  sender({to: senderInfo.to}, data).then(result => {
    // emailLog.info('Sending email "' + senderInfo.subject +'" to ' + result.envelope.to + ' successfull.')
  }).catch(error => {
    // emailLog.error('Sending email "' + senderInfo.subject +' error.')
    // emailLog.error(error)
  })
}

// send email to multi users
const sendEmails = (senderInfos, emailTemplate,  dynamicHtml = [], dynamicText = []) => {
  let textTemplate, htmlTemplate
  try {
    textTemplate = fs.readFileSync(path.resolve(__dirname, `../templates/${emailTemplate}.txt`), 'utf8')
    htmlTemplate = fs.readFileSync(path.resolve(__dirname, `../templates/${emailTemplate}.html`), 'utf8')
    let data = senderInfos[0]; 
    // console.log({data, dynamicHtml})   
    dynamicHtml.forEach(vl => {
      htmlTemplate = htmlTemplate.replace(`{{${vl}}}`, data[vl])
    })
    dynamicText.forEach(vl => {
      textTemplate = textTemplate.replace(`{{${vl}}}`, data[vl])
    })
  } catch (error) {
    console.log("Can not load email template", error)
    // emailLog.error("Can not load email template", error)
    return Promise.reject("Can not load email template")
  }
  // let transporter = nodemailer.createTransport(`smtp://${config.SMTP_FROM_ADDRESS}:${config.SMTP_FROM_PASSWORD}@${config.SMTP_SERVER}`)
  let transporter  = nodemailer.createTransport({
    host: config.SMTP_SERVER,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.SMTP_FROM_ADDRESS, // generated ethereal user
        pass: config.SMTP_FROM_PASSWORD  // generated ethereal password
    }
  });
  senderInfos.forEach((senderInfo, index) => {
    let sender = transporter.templateSender({
      subject: senderInfo.subject,
      text: textTemplate,
      html: htmlTemplate
    }, {
      from: config.SMTP_FROM_ADDRESS
    })
    if(senderInfo.to){
      sender({to: senderInfo.to}, senderInfo).then(result => {
        // emailLog.info('Sending email "' + senderInfo.subject +'" to ' + result.envelope.to + ' successfull.')
      }).catch(error => {
        // emailLog.error('Sending email "' + senderInfo.subject +' error.')
        // emailLog.error(error)
      })
    }
  })
  
}

const convertUnit = (n, {isConvert = false, convertTo = '1'}) => {
  if(!isConvert) return n
  const arr = convertTo.split('/')
  if(arr.length == 2)
    return  _.ceil(n * _.toNumber(arr[0]) / _.toNumber(arr[1]))
  
  if(arr.length == 1)
    return _.ceil(n * _.toNumber(arr[0]))

  return n
}

module.exports = {
  convertUnit,
  sendEmail,
  sendEmails,
  sendEmailStandard
}
