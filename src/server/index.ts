import path from 'path'
import * as express from 'express'
import bodyParser from 'body-parser'

import api from './Api'

const PORT = process.env.PORT || 3000

export default express
  .default()
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(api)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
