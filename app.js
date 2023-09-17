import express from "express"
import bodyParser from "body-parser"
import path from "path"

import * as Controller from "./controller/controller.js"

export const app = express()
const port = Number(process.env.PORT) || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (res) => res.sendFile(path.join(__dirname, '../public/index.html')))

app.get('/slack/oauth', (req, res) => Controller.handleOauth(req)
  .then((response) => res.redirect(`https://app.slack.com/client/${response.team.id}`))
  .catch((error) => res.status(400).send(error)))

app.post('/slack/watercooler', async (req, res) => Controller.handleCommand(req)
  .then((response) => res.status(200).send(response))
  .catch((error) => res.status(400).send(error)))

app.post('/slack/actions', async (req, res) => Controller.handleAction(req)
  .then((response) => res.status(200).send(response)))

app.use((req, res) => res.status(404).send('404 Not Found'))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// setup ngrok
import * as ngrok from "@ngrok/ngrok";
(async function () {
  await ngrok.authtoken(process.env.NGROK_AUTHTOKEN || "")

  const url = await ngrok.connect({
    addr: port,
    domain: process.env.NGROK_DOMAIN,
  })
  console.log(`ngrok at: ${url}`)
})()
