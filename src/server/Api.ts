import url from 'url'
import * as express from 'express'
import Analytics from './Analytics'

const router: express.Router = express.Router()

export default router.post(
  '/api/analyze',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const urls: string[] = req.body.urls
      .filter((urlString: string): boolean => !!url.parse(urlString).hostname)
      .filter(
        (urlString: string, index: number, arr: string[]): boolean =>
          arr.indexOf(urlString) === index
      )
    console.log(urls)
    const requests: Promise<any>[] = []
    for (let i: number = 0; i < urls.length; i++) {
      requests.push(Analytics.analyze(urls[i]))
    }
    const results = await Promise.all(requests)
    res.json(results)
  }
)
