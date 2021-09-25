import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {
  getUserUseCase,
  createUserUseCase,
  updateUserUseCase,
} from './usecases/user'
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
import { createMembershipUseCase } from './usecases/membership'
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

const wrap = (
  fn: (req: express.Request, res: express.Response) => Promise<void>
) => {
  return (req: express.Request, res: express.Response) =>
    fn(req, res).catch((err) => {
      if (err instanceof Errors.PermissionError) {
        res.status(404).send({ error: '権限がありません' })
      } else if (err instanceof Errors.ValidationError) {
        res.status(400).send({ error: '不正な操作です' })
      } else if (err instanceof Errors.AuthenticationError) {
        res.status(401).send({ error: err.message })
      } else {
        throw err
      }
    })
}

app.get(
  '/projects',
  wrap(async (req: express.Request, res: express.Response) => {
    const uid = await verifyIdToken(req)
    const [userId, projects] = await getProjectsUseCase(uid)
    if (projects) res.json(projectsPresenter(userId, projects))
  })
)

app.get(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    await verifyIdToken(req)
    const project = await getProjectUseCase(req.params.projectId)
    if (project) res.json(project)
  }
)

app.get(
  '/projects/:projectId/programs/:programId',
  async (req: express.Request, res: express.Response) => {
    await verifyIdToken(req)
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
      req.body.program.name,
      uid
    )
    res.json(programDetailPresenter(program))
  }
)

app.post('/projects', async (req: express.Request, res: express.Response) => {
  const uid = await verifyIdToken(req)
  const result = await createProjectUseCase(req.body.project.name, uid)
  if (result) res.json(result)
})

app.get(
  '/users/:userId',
  async (req: express.Request, res: express.Response) => {
    const user = await getUserUseCase(req.params.userId)
    res.json(user)
  }
)

app.post('/users', async (req: express.Request, res: express.Response) => {
  const uid = await verifyIdToken(req)
  const result = await createUserUseCase(
    req.body.user.name,
    req.body.user.email,
    uid
  )
  if (result) res.json(result)
})

app.patch('/users', async (req: express.Request, res: express.Response) => {
  const uid = await verifyIdToken(req)
  const result = await updateUserUseCase(
    req.body.user.name,
    req.body.user.email,
    uid
  )
  if (result) res.json(result)
})

app.patch(
  '/projects/:projectId',
  async (req: express.Request, res: express.Response) => {
    const uid = await verifyIdToken(req)
    const result = await updateProjectUseCase(
      req.params.projectId,
      req.body.project.name,
      uid
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
      req.body.program.name,
      uid
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
      req.body.program.source,
      uid
    )
    res.json(programUpdateSourcePresenter(program))
  }
)

app.post(
  '/projects/:projectId/membership',
  async (req: express.Request, res: express.Response) => {
    await verifyIdToken(req)
    const { email } = req.body
    const { projectId } = req.params
    const result = await createMembershipUseCase(projectId, email)
    res.json(result)
  }
)

export default app
