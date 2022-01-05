const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'yunusyerli1@gmail.com',
        subject:'Thank for joining in!',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'yunusyerli1@gmail.com',
        subject:'Account Cancellation',
        text:`Goodbye ${name}, We are really sad to hear that you are leaving.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}