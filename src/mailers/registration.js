require('dotenv').config();

module.exports = function registrationEmail(firstName, lastName, email) {
  return {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Registration successful',
    html: `
      <h1>Welcome ${firstName} ${lastName}!</h1>
      <p>You success create account on email ${email}</p>
      <hr />
    `,
  };
};
