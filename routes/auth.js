import express from 'express'
const Router = express.Router()
import {register ,login} from '../controllers/auth.js'
import {verify_user} from '../middleware/auth.js'


Router.route('/register').post(register)
Router.route('/login').post(login)



export default Router
