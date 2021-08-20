import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import projectDetailQuery from './queries/project'
import { createProjectUseCase } from './usecases/project'
import { getProgramUseCase } from './usecases/program'
import { programDetailPresenter } from './presenters/program'

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

app.get(
  '/projects/:projectId/programs/:programId',
  async (req: express.Request, res: express.Response) => {
    const program = await getProgramUseCase(req.params.programId)
    if (program) res.json(programDetailPresenter(program))
  }
)

app.post('/projects', async (req: express.Request, res: express.Response) => {
  const result = await createProjectUseCase(req.body.project)
  res.json(result)
})

export default app
