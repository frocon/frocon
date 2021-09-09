export class User {
  id: string
  name: string | null
  email: string

  constructor(id: string, name: string | null, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }
}
