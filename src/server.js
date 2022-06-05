import express from "express";
import morgan from "morgan"
import router from "./routes/routes.js"

// Settings
const app = express()
app.set('port',3000)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Middlewares
app.use(morgan('dev'))

//routers
app.use('/api',router)

export default app