import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import connection from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import { fileURLToPath } from 'url';

import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const port = process.env.PORT || 7000
const app = express()

connection()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use('/user',userRoutes)
app.use('/account',accountRoutes)
app.use('/transaction',transactionRoutes)
app.use('', express.static(join(__dirname, 'upload')));


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running om port ${port}`));
