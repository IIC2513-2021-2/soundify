require('dotenv').config();

const sendgridMail = require('./sendgrid');

module.exports = function sendRegistrationEmail(user) {
  const { firstName, lastName, email } = user;
  const emailData = {
    from: process.env.SENDGRID_EMAIL,
    personalizations: [{
      to: {
        email,
      },
      dynamic_template_data: {
        first_name: firstName,
        last_name: lastName,
        subject: 'Registration successful',
      },
    }],
    template_id: process.env.SENDGRID_NEW_USER,
  };

  return sendgridMail.send(emailData);
};
