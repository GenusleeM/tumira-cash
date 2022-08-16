import express, { Router } from 'express'
import { get_all_cash_deposits,  get_all_deposits,  get_all_users, get_all_user_details,  get_all_user_transactions, get_statistics } from '../controllers/admin.js'
import { verify_user } from '../middleware/auth.js'

const Route = express.Router()


Route.route('/getusers').get( verify_user, get_all_users)
Route.route('/deposits').get( verify_user,get_all_deposits)

//geting user details
Route.route('/getuser').post(get_all_user_details)
Route.route('/user_transactions').post(get_all_user_transactions)


Route.route('/cash/allCashDeposits').get(verify_user, get_all_cash_deposits)
Route.route('/cash/statistics').get(verify_user,get_statistics )









export default Route