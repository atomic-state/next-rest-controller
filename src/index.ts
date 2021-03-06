import { NextApiRequest, NextApiResponse } from "next/types"

type ControllerMethods = {
  [k: string]: (req: NextApiRequest, res: NextApiResponse) => void
}

export function Controller(path: string, paths: ControllerMethods = {}) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let handled = false
    const { url = "" } = req
    const [urlWithourQueryParams] = url.split("?")

    const urlParts = urlWithourQueryParams.split("/")

    const handlePathUrl = "/api" + path

    let hasHandlers = false

    try {
      for (let path in paths) {
        const [method, handleUrl] = path.split(" ")

        let $handleUrl = handlePathUrl + handleUrl.split("?")[0]

        const handleParts = $handleUrl.split("/")

        let finalHandler: string[] = []

        let finalQuery: any = {}

        handleParts.forEach((handlePart, i) => {
          if (
            (handlePart.startsWith("[") && handlePart.endsWith("]")) ||
            handlePart.startsWith(":")
          ) {
            hasHandlers = true
            const withoutBrackets = handlePart.replace(/\[|\]|\:/g, "")

            finalQuery[withoutBrackets] = urlParts[i]

            finalHandler.push(urlParts[i] as never)
          } else {
            finalHandler.push(handlePart as never)
          }
        })

        if (finalHandler.join("/") === urlParts.join("/") && !handled) {
          hasHandlers = true

          if (req.method === method) {
            const withQ = { ...req.query, ...finalQuery }
            req.query = withQ

            paths[path](req, res)
            handled = true
            break
          }
        }
      }
    } catch (err) {
    } finally {
      if (!handled) {
        if (hasHandlers) {
          res.status(405)
          res.send(`cannot ${req.method} ${req.url}`)
        } else {
          res.status(404)
          res.send("not found")
        }
      }
    }
  }
}
