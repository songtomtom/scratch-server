import { Request, Response } from 'express'
import fs from 'fs'
import atob from 'atob'
import path from 'path'
import cryptoRandomString from 'crypto-random-string'

export const uploadImage = function (req: Request, res: Response) {
  const { croppedImageData, file } = req.body

  const newImageName = cryptoRandomString({ length: 20 }) + '.png'
  const newImagePath = path.join(
    __dirname,
    '../../static/uploads/' + newImageName
  )

  const newImageData = Uint8Array.from(
    atob(croppedImageData.replace(/^data:image\/(png|gif|jpeg);base64,/, '')),
    (chr) => chr.charCodeAt(0)
  )

  const newImageOptions: fs.WriteFileOptions = {
    encoding: 'utf8',
    mode: '0777'
  }

  fs.writeFile(newImagePath, newImageData, newImageOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json(err)
    }
    res.json({
      fileUrl: '/uploads/' + newImageName
    })
  })
}
