import express, { Router } from 'express'
import { create_cash_charge, delete_charge_price, get_latest_percentage_charge, get_prevous_charges } from '../controllers/cashCharge.js'
import { verify_user } from '../middleware/auth.js'
import { authRole } from '../middleware/authRoles.js'
import { ROLES } from '../util/Roles.js'

const Route = express.Router()


Route.route('/create').post( verify_user,authRole(ROLES.ADMIN),create_cash_charge)
Route.route('/getCharge').get(verify_user,get_latest_percentage_charge)
// Route.route('/update').post( verify_user,authRole(ROLES.ADMIN), update_price)
Route.route('/delete').delete(verify_user,authRole(ROLES.ADMIN),delete_charge_price)
Route.route('/all').get(verify_user,authRole(ROLES.ADMIN),get_prevous_charges)







export default Route