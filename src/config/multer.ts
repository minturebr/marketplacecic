import { Request } from 'express'

import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const multerConfigCatalog = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'catalogs'),
  storage: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'catalogs'))
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
      'text/csv'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}

const multerConfigBook = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books'),
  storage: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books'))
    },
    filename: (req: Request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err, 'Invalid File')
        }

        const fileName: string = `${hash.toString('hex')}.pdf`
        cb(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req: Request, file, cb) => {
    const allowedMimes: Array<string> = [
      'application/pdf'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}

export { multerConfigCatalog, multerConfigBook }
