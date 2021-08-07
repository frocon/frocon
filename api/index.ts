import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ message: 'Hello world!' })
})

export default app
