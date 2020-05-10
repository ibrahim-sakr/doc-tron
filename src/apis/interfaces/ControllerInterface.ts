import {IRouter} from 'express'

export default interface ControllerInterface {
    getBasePath(): string
    getRouter(): IRouter
}
