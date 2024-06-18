import { Router } from "express";
import { addAccount, deleteAccount, editAccount, getAccount } from "../controllers/accountController.js";
import authCheck from "../middlewares/authCheck.js";


const router = Router()

router.use(authCheck)
router.post('/add',addAccount)
router.post('/getaccountDetails',getAccount)
router.patch('/edit',editAccount)
router.patch('/delete',deleteAccount)


export default router