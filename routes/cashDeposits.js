import express from 'express'
import { get_all_cash_deposits, loadCashDeposit, number_of_deposits, update_deposit } from '../controllers/cashDeposits.js';
const Router = express.Router()
import { verify_user } from '../middleware/auth.js';
import { authRole } from '../middleware/authRoles.js';
import { ROLES } from '../util/Roles.js';


Router.route('/load').post( verify_user,authRole(ROLES.ADMIN), loadCashDeposit);
Router.route('/total').get( verify_user,authRole(ROLES.ADMIN), number_of_deposits);
Router.route('/getdeposits').get(verify_user,authRole(ROLES.TRUCKOWNER),get_all_cash_deposits)
Router.route('/update').post(verify_user,authRole(ROLES.ADMIN),update_deposit)

export default Router

