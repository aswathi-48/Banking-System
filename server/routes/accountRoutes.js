import { Router } from "express";
import { addAccount, deleteAccount, editAccount, getAccount, getAllAccounts } from "../controllers/accountController.js";
import authCheck from "../middlewares/authCheck.js";


const router = Router()
router.post('/allaccount',getAllAccounts)

router.use(authCheck)
router.post('/add',addAccount)
router.post('/getaccountDetails',getAccount)
router.patch('/edit',editAccount)
router.patch('/delete',deleteAccount)

export default router