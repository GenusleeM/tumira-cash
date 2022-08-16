import express from 'express'
import { init, reset } from '../controllers/cashCounter.js'
const Router = express.Router()

import {verify_user} from '../middleware/auth.js'


Router.route('/init').post(init)
Router.route('/reset').post(reset)



export default Router
