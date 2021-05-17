import express, { Application, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'
import chalk from 'chalk'
import { StatusCodes } from 'http-status-codes'

import config from './config'

import coreRoute from './routes/core'
import uploadRoute from './routes/sequence'

/**
 * Express server
 */
export class Server {
  app: Application

  constructor() {
    this.app = express()

    if (this.app) {
      this.init()
    }
  }

  private init() {
    this.initLocalVariables()
    this.initMiddleware()
    this.initViewEngine()
    // this.init404ErrorRoute();
    this.initServerRoute()
    this.initErrorRoute()
  }

  /**
   * Initialize local variables
   */
  initLocalVariables() {
    // this.app.locals.favicon = config.favicon
    this.app.locals.env = process.env.NODE_ENV
  }

  private initServerRoute() {
    coreRoute(this.app)
    uploadRoute(this.app)
  }

  /**
   * Initialize middlewares
   */
  private initMiddleware() {
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
  }

  /**
   * Initialize view engine
   */
  private initViewEngine() {
    this.app.set('views', path.join(__dirname, 'views'))
    this.app.set('view engine', 'ejs')
    this.app.use(express.static(path.join(__dirname, '../static')))
  }

  /**
   * Error handler
   */
  private initErrorRoute() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        // logger.err(err, true);
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: err.message
        })
      }
    )
  }

  /**
   * catch 404 and forward to error handler
   */
  private init404ErrorRoute() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(404))
    })
  }

  private toPort(port: string | number) {
    return typeof config.port === 'string'
      ? parseInt(port as string, 10)
      : (port as number)
  }

  /**
   * Setting Node environment value
   */
  setEnvironment(env = 'development') {
    if (env === 'devdevelopment' || env === 'dev') {
      process.env.NODE_ENV = 'development'
    } else if (env === 'production' || env === 'prod') {
      process.env.NODE_ENV = 'production'
    } else if (env === 'test') {
      process.env.NODE_ENV = 'test'
    } else {
      process.env.NODE_ENV = 'development'
    }
  }

  /**
   * Express start
   */
  start(env = 'development') {
    /**
     * Express server listen and start callback handler
     */
    const onListen = () => {
      console.log('--')
      console.log(
        chalk.blue(
          `${config.app.title} - ${process.env.NODE_ENV.toUpperCase()}`
        )
      )
      console.log(chalk.white(`https://${config.domain}:${config.port}`))
      console.log('--')
    }

    /**
     * Set environment variable
     */
    this.setEnvironment(env)

    const port = this.toPort(config.port)
    this.app.listen(port, onListen)
  }
}

export default Server
