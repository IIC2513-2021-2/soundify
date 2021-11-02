require('dotenv').config();

module.exports = function registrationEmail(firstName, lastName, email) {
  return {
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
};
