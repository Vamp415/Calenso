const nodemailer = require('nodemailer');
const logger = require('../src/lib/logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    logger.error('SMTP transporter verification failed', { error: error.message });
  } else {
    logger.info('SMTP transporter is ready to send emails', { host: process.env.SMTP_HOST, port: process.env.SMTP_PORT });
  }
});

// Send OTP email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to: email,
    subject: 'Verify your Calenso account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Welcome to Calenso!</h2>
        <p style="color: #666; line-height: 1.6;">Thank you for signing up. Please use the following OTP to verify your email address:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="color: #666; line-height: 1.6;">This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">This is an automated email from Calenso. Please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('OTP email sent successfully', { email });
    return true;
  } catch (error) {
    logger.error('Error sending OTP email', { error: error.message, email });
    throw new Error('Failed to send OTP email');
  }
}

// Send password reset email
async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to: email,
    subject: 'Reset your Calenso password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #666; line-height: 1.6;">We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #666; line-height: 1.6;">Or copy and paste this link into your browser:</p>
        <p style="color: #007bff; word-break: break-all;">${resetUrl}</p>
        <p style="color: #666; line-height: 1.6;">This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">This is an automated email from Calenso. Please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Password reset email sent successfully', { email });
    return true;
  } catch (error) {
    logger.error('Error sending password reset email', { error: error.message, email });
    throw new Error('Failed to send password reset email');
  }
}

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail,
};
