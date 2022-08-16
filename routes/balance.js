import express from 'express'
import { get_user_balance } from '../controllers/balances.js'
const Router = express.Router()
import { verify_user } from '../middleware/auth.js'


Router.route('/getbalance').get( verify_user,get_user_balance)



export default Router