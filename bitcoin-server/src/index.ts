import 'dotenv'

import cors from 'cors'
import express from 'express'

import { router as priceRouter } from './routes/price.routes'
import { router as userRouter } from './routes/user.routes'
import { initiateGuessResolver } from './services/guess.service'

const app = express()
const port = process.env.PORT

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/price', priceRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
    initiateGuessResolver()
})
