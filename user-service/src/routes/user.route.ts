import express, { Express, Request, Response } from 'express'
import {test} from '../controllers/user.controller'

const route = express.Router()

route.get("/", test)

export default route
