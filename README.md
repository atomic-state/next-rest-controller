## REST controller for Next.js

#### How does it work?

Create restful controllers in Next.js

#### Example:

Inside `/pages/api/auth/[...handler]`

(filename must be a rest operator if you want customized URLs, but you can also use normal api handlers filenames, though they have to share the same URL in your controller)

```ts
// inside /pages/api/auth/[...handler]

import { Controller } from "next-rest-controller"

// The first argument is the 'base' segment that will be used to map the correct url.
const AuthHandler = Controller("/auth", {
    async "GET /auth"(req, res) {
        res.status(401)
        res.send("Forbidden")
    },
    async "GET /[id]/info"(req, res) {
        res.send("Info for " + req.query.id)
    },
    // Like Express
    async "GET /:id/info/:slug"(req, res) {
        res.send("Info for " + req.query.id)
    }
})
```

#### Explanation
When adding a handler/method, it should start with an HTTP verb, followed by a space, and a url to handle (with or without query params using square brackets, or like Express, by placing `:` before).

Sending, for example, a POST request that would be handled by a GET handler, will send a `405` status code