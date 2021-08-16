import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import projectDetailQuery from './queries/project'

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.get(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const project = await projectDetailQuery(req.params.projectId)
    res.json(project)
  }
)

export default app
