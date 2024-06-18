import { Router } from "express";
import { upload } from "../middlewares/multer/fileUpload.js";
import { deleteUser, editUser, getClientUsers, getUser, login, register } from "../controllers/userController.js";
import authCheck from "../middlewares/authCheck.js";


const router = Router()

router.post('/register',upload.single("image"),register)
router.post('/login',login)
router.post('/clients',getClientUsers)
router.use(authCheck)
// router.post('/test_auth_check', authConfirmTest)
router.post('/profile',getUser)
router.patch('/edit',editUser)
router.patch('/delete',deleteUser)

export default router