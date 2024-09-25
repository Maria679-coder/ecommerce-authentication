// const nodemailer = require('nodemailer')
const adminModel = require('../models/admin.model');
const bcrypt = require('bcrypt')
// const Jwt = require('jsonwebtoken')

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const existedUser = await adminModel.findOne({ email })
    if (existedUser) {
      return res.status(409).json({
        succes: false,
        msg: "Email already Exist,please use another email"
      })
    }
    const admin = await adminModel.create({
      name:name,
      email:email,
      phone:phone,
      password:hashedPassword,
      image:image
    }) 
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    })
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Email and password are required.",
      });
    }

    // Find the admin user by email
    const existedUser = await adminModel.findOne({ email });

    // If user not found, return error
    if (!existedUser) {
      return res.status(404).json({
        success: false,
        msg: "Admin not found. Please check the credentials.",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, existedUser.password);

    // If the password is invalid, return error
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials. Please try again.",
      });
    }

    // If successful, return a success message
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
    });
  } catch (error) {
    // Log the error for debugging purposes (do not expose this in production)
    console.error("Error during admin login:", error);

    // Return a generic error message to avoid exposing internal error details
    return res.status(500).json({
      success: false,
      msg: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getSingleAdmin = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const admin = await adminModel.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.status(200).json({
      message: `admin with this ${id} Deleted successfully`,
      admin
    });
  } catch (error) {
    res.status(500).json({ msg: 'server error', error })
  }
}
const updateAdmin = async (req, res) => {
  // const hashedPassword = await bcrypt.hash(password, existedUser.password)
  const { id } = req.params;
  const body = req.body;
  try {
    const admin = await adminModel.findByIdAndUpdate(id, body, { new: true })
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: `Admin updated successfully with ${id}`, admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
const forgetPassword = async (req, res) => {
  console.log("forgetPassword")
};
// const sendResetEmail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
//     const info = await transporter.sendMail({
//       from: '"Maria ch" <chmaria912@gmail.com>',
//       to: email,
//       subject: 'Password Reset Request',
//       text: 'Hello, please click the link below to reset your password.',
//       html: `<b>Click <a href="https://yourdomain.com/reset-password">here</a> to reset your password</b>`,
//     });
//     console.log('Email sent: %s', info.messageId);
//     res.status(200).json({
//       success: true,
//       msg: 'Check your email to reset your password.',
//       info,
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({
//       success: false,
//       msg: 'Failed to send email. Please try again later.',
//       error,
//     });
//   }
// }
module.exports = { registerAdmin, loginAdmin, getAdmins, getSingleAdmin, deleteAdmin, updateAdmin, forgetPassword}