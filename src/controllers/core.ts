import { Request, Response } from 'express'

/**
 * Render the index
 */
export const renderIndex = function (req: Request, res: Response) {
  res.render('index')
}
