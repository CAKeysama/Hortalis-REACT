import functions from "firebase-functions"
import express from "express"
import { createRequestHandler } from "@react-router/node"
import * as build from "../build/server/index.js"

const app = express()

app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV
  })
)

export const ssrApp = functions.https.onRequest(app)