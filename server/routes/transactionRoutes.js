import { Router } from "express";
import { deposit, getTransactions, withdraw } from "../controllers/transactionController.js";
import authCheck from "../middlewares/authCheck.js";


const router = Router()

router.use(authCheck)
router.post('/deposit', deposit)
router.post("/withdraw",withdraw)
router.post("/getTransactions",getTransactions)

export default router