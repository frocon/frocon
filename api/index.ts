import express, { NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {
  getProjectsUseCase,
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
import { projectDetailPresenter, projectsPresenter } from './presenters/project'
import { verifyIdToken } from './infrastructures/firebase'
import * as Errors from './entities/error'

const app: express.Express = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const wrap = (fn: (req: express.Request, res: express.Response, next: NextFunction) => Promise<void>) => {
  return (req: express.Request, res: express.Response, next: NextFunction) => fn(req, res, next).catch((err) => {
    if (err instanceof Errors.PermissionError) {
      res.status(404).send({error: "権限がありません"})
    } else if (err instanceof Errors.ValidationError) {
      res.status(400).send({error: "不正な操作です"})
    } else if (err instanceof Errors.AuthenticationError) {
      res.status(401).send({error: "認証に失敗しました"})
    }
  })
}

app.get('/projects', wrap(async (req: express.Request, res: express.Response, next: NextFunction) => {
  const uid = await verifyIdToken(req)
  const [userId, projects] = await getProjectsUseCase()
  if (projects) res.json(projectsPresenter(userId, projects))
}))

app.get(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const uid = await verifyIdToken(req)
    const project = await getProjectUseCase(req.params.projectId)
    if (project) res.json(project)
  }
)

app.get(
  '/projects/:projectId/programs/:programId',
  async (req: express.Request, res: express.Response) => {
    const uid = await verifyIdToken(req)
    const program = await getProgramUseCase(req.params.programId)
    if (program) res.json(programDetailPresenter(program))
  }
)

app.post(
  '/projects/:projectId/programs',
  async (req: express.Request, res: express.Response) => {
    const uid = await verifyIdToken(req)
    const program = await createProgramUseCase(
      req.params.projectId,
      req.body.program.name
    )
    res.json(programDetailPresenter(program))
  }
)

app.post('/projects', async (req: express.Request, res: express.Response) => {
  const uid = await verifyIdToken(req)
  const result = await createProjectUseCase(req.body.project.name)
  if (result) res.json(result)
})

app.patch(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const uid = await verifyIdToken(req)
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
    const uid = await verifyIdToken(req)
    if (uid === '') {
      res.status(401).send('Unauthorized')
      return
    }
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
    const uid = await verifyIdToken(req)
    if (uid === '') {
      res.status(401).send('Unauthorized')
      return
    }
    const program = await updateProgramSourceUseCase(
      req.params.projectId,
      req.params.programId,
      req.body.program.source
    )
    res.json(programUpdateSourcePresenter(program))
  }
)

// エラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response) => {
  if (err instanceof Errors.PermissionError) {
    res.status(404).send({error: "権限がありません"})
  } else if (err instanceof Errors.ValidationError) {
    res.status(400).send({error: "不正な操作です"})
  } else if (err instanceof Errors.AuthenticationError) {
    res.status(401).send({error: "認証に失敗しました"})
  }
})

export default app
