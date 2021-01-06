import { Request } from 'express'

import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req: Request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err, 'Invalid File')
        }

        const fileName: string = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req: Request, file, cb) => {
    const allowedMimes: Array<string> = [
      'text/csv',
      'application/pdf'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}

export default multerConfig
