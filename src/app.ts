import Server from './server'

export function start() {
  const app = new Server()
  app.start('dev')
}
