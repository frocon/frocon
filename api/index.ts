import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import projectDetailQuery from './queries/project'
import programDetailQuery from './queries/program'
import programFactory from './factories/program_factory'
import { verifyIdToken } from './infrastructures/firebase'

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.get(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const project = await projectDetailQuery(req.params.projectId)
    const uid = await verifyIdToken(req).catch(() => '')
    res.json(project)
  }
)

app.get(
  '/projects/:projectId/programs/:programId',
  async (req: express.Request, res: express.Response) => {
    const queriedProgram = await programDetailQuery(req.params.programId)
    if (queriedProgram != null) {
      const program = programFactory(queriedProgram)
      res.json(program)
    }
  }
)

export default app
