import puppeteer from 'puppeteer'
import { response } from 'express'

export default class Analytics {
  public static async analyze(
    path: string,
    option = {}
  ): Promise<Map<string, any>> {
    const result: any = {
      pageUrl: path
    }
    const browser: puppeteer.Browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page: puppeteer.Page = await browser.newPage()
    page.on('error', (error: any) => {
      console.log(error)

      if (!result.error) {
        result.error = []
      }

      result.error.push(error)
    })
    page.on(
      'pageerror',
      (pageError: any): void => {
        console.log(pageError)

        if (!result.pageError) {
          result.pageError = []
        }

        result.pageError.push(pageError)
      }
    )
    page.on('response', async (response: any) => {
      if (response.ok()) {
        return
      }

      if (!result.responseError) {
        result.responseError = []
      }

      result.responseError.push({
        status: response.status(),
        url: response.url(),
        headers: response.headers()
      })
    })

    page.on('load', console.log)

    await page.goto(path).catch(err => {
      console.log(err)
    })

    result.meta = await page.$$eval('meta', meta => {
      const r: { [key: string]: string }[] = []

      for (let i = 0; i < meta.length; i++) {
        const attrs = meta[i].attributes
        const elObj: { [key: string]: string } = {}

        for (let j = 0; j < attrs.length; j++) {
          elObj[attrs[j].name] = attrs[j].value
        }

        r.push(elObj)
      }

      return r
    })

    await browser.close()
    return result
  }
}
