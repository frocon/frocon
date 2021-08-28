import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import {
  getProjectUseCase,
  createProjectUseCase,
  updateProjectUseCase,
} from './usecases/project'
import {
  getProgramUseCase,
  createProgramUseCase,
  updateProgramNameUseCase,
  updateProgramSourceUseCase,
} from './usecases/program'
import {
  programDetailPresenter,
  programUpdateNamePresenter,
  programUpdateSourcePresenter,
} from './presenters/program'
import { projectDetailPresenter } from './presenters/project'

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.get(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const project = await getProjectUseCase(req.params.projectId)
    if (project) res.json(project)
  }
)

app.get(
  '/projects/:projectId/programs/:programId',
  async (req: express.Request, res: express.Response) => {
    const program = await getProgramUseCase(req.params.programId)
    if (program) res.json(programDetailPresenter(program))
  }
)

app.post(
  '/projects/:projectId/programs',
  async (req: express.Request, res: express.Response) => {
    const program = await createProgramUseCase(
      req.params.projectId,
      req.body.program.name
    )
    res.json(programDetailPresenter(program))
  }
)

app.post('/projects', async (req: express.Request, res: express.Response) => {
  const result = await createProjectUseCase(req.body.project.name)
  if (result) res.json(result)
})

app.patch(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const result = await updateProjectUseCase(
      req.params.projectId,
      req.body.project.name
    )
    if (result) res.json(projectDetailPresenter(result))
  }
)

app.patch(
  '/projects/:projectId/programs/:programId/name',
  async (req: express.Request, res: express.Response) => {
    const program = await updateProgramNameUseCase(
      req.params.projectId,
      req.params.programId,
      req.body.program.name
    )
    res.json(programUpdateNamePresenter(program))
  }
)

app.patch(
  '/projects/:projectId/programs/:programId/source',
  async (req: express.Request, res: express.Response) => {
    const program = await updateProgramSourceUseCase(
      req.params.projectId,
      req.params.programId,
      req.body.program.source
    )
    res.json(programUpdateSourcePresenter(program))
  }
)

export default app
