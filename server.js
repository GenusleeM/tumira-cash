import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import express from 'express'
import dbConnect from './config/dbConnect.js'
const PORT = process.env.PORT
const app = express()

import auth_routes from "./routes/auth.js"
// import truck_routes from './routes/trucks.js'
import admin_routes from './routes/admin.js'

import loadCashDeposits_routes from "./routes/cashDeposits.js"
import cashReport_Routes from './routes/cashReports.js'
import  cash_charges_Routes from "./routes/cashCharge.js"
import cashCounterRoutes from "./routes/cashOrderCounter.js"

dbConnect()

app.use(cors())
app.use(express.json())

//all the middles now
app.use('/auth',auth_routes)
app.use('/admin',admin_routes)

/**cash endpoints */

app.use('/cash',loadCashDeposits_routes)
app.use('/cashReports',cashReport_Routes)
app.use('/cashCharge',cash_charges_Routes)
app.use('/cashOrderCounter',cashCounterRoutes)

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});


app.get('/',(req,res) =>{
    console.log(req.body)
    console.log("someone is home...")
    res.json({
        success:"true",
        token:"Tumira 247 api",
        owner:"genuslee"
    })
})

app.listen(process.env.PORT || PORT,(req,res) =>{
    console.log(`Server is running on port: ${PORT}`)
})







