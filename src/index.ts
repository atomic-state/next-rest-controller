import { NextApiRequest, NextApiResponse } from "next/types"

type ControllerMethods = {
  [k: string]: (req: NextApiRequest, res: NextApiResponse) => void
}

export function Controller(paths: ControllerMethods = {}) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    let handled = false

    const { url = "" } = req
    const [urlWithourQueryParams] = url.split("?")

    const urlParts = urlWithourQueryParams.split("/")

    const handlePathUrl = "/api/" + __dirname.split("/api/").at(-1)

    for (let path in paths) {
      const [method, handleUrl] = path.split(" ")

      let $handleUrl = handlePathUrl + handleUrl.split("?")[0]

      const handleParts = $handleUrl.split("/")

      let finalHandler: string[] = []

      let finalQuery: any = {}

      handleParts.forEach((handlePart, i) => {
        if (handlePart.startsWith("[") && handlePart.endsWith("]")) {
          const withoutBrackets = handlePart.replace(/\[|\]/g, "")

          finalQuery[withoutBrackets] = urlParts[i]

          finalHandler.push(urlParts[i] as never)
        } else {
          finalHandler.push(handlePart as never)
        }
      })

      if (finalHandler.join("/") === urlParts.join("/") && !handled) {
        const withQ = { ...req.query, ...finalQuery }

        if (req.method === method) {
          req.query = withQ

          paths[path](req, res)
        } else {
          res.status(405)

          res.send(`Cannot ${req.method} ${url}`)
        }
      }
    }
  }
}
