## REST controller for Next.js

#### How does it work?

Create restful controllers in Next.js

#### Example:

Inside `/pages/api/auth/[...handler]`

(filename must be a rest operator if you want customized URLs, but you can also use normal api handlers filenames, though they have to share the same URL in your controller)

```ts
import { Controller } from "next-rest-controller"

const AuthHandler = Controller({
    async "GET /auth"(req, res){
        res.status(401)
        res.send("Forbidden")
    },
    async "GET /[id]/info"(req, res){
        res.send("Info for " + req.query.id)
    }
})

```

Sending, for example, a POST request that would be handled by a GET handler, will send a `405` status code