import { Application } from 'express'

import { uploadImage } from '../controllers/upload'

export default function routeConfig(app: Application) {
  app.post('/api/upload', uploadImage)
}
