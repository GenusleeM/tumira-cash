import express, { Router } from 'express'
import { get_account_statement } from '../controllers/cashReports.js'

import { verify_user } from '../middleware/auth.js'

const Route = express.Router()


Route.route('/account_statement').get( verify_user,get_account_statement)









export default Route