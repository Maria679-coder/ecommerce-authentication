const  express = require('express')
const router = express.Router()
const {registerAdmin,getAdmins, getSingleAdmin, deleteAdmin, updateAdmin, loginAdmin, forgetPassword,} = require('../controllers/admin.controller')

router.post('/register',registerAdmin)
router.get('/loginAdmin', loginAdmin)
router.get('/getAdmins', getAdmins)
router.get('/getAdmin/:id', getSingleAdmin)
router.delete('/deleteAdmin/:id', deleteAdmin)
router.patch('/updateAdmin/:id', updateAdmin)
router.post('/forgetPassword', forgetPassword)
// router.post('/resetPassword', sendResetEmail)



module.exports= router