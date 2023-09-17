import { giphyTranslate } from "../app/giphy"
import { getRandomKaomoji, getRandomEmojiCombo, getRandomPrompt, filterQuery } from "../app/utils"

export const handleOauth = async (req) => {
    try {
        const code = req.query.code

        const body = {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: code
        }

        const options = {
            method: "POST",
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(body)
        }

        const data = await fetch("https://slack.com/api/oauth.v2.access", options)

        const response = await data.json()

        return response
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export const handleCommand = async (req) => {

    try {
        switch (req.body.command) {
            case process.env.SLACK_COMMAND:
                return await generateNewQuestion()
            default:
                return await handleError()
        }
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export const handleAction = async (req) => {
    try {

        const data = JSON.parse(req.body.payload)

        switch (data.actions[0].value) {
            case "new_question":
                return await replaceNewQuestion(data)
            case "new_gif":
                return await updateSameQuestion(data)
            default:
                return await handleError()
        }

    } catch (error) {
        console.error(error)
        return error
    }
}

const generateNewQuestion = async (replaceOriginalMsg = false) => {
    const title = `${getRandomEmojiCombo()} Question of the day ${getRandomKaomoji()}`
    const prompt = getRandomPrompt()
    const gifQuery = filterQuery(prompt)
    const gif = await giphyTranslate(gifQuery)

    return respBody(title, prompt, gif, replaceOriginalMsg)
}

const replaceNewQuestion = async (data) => {
    const newQuestion = await generateNewQuestion(true)

    const options = createOptions("POST", newQuestion)

    return await fetch(data.response_url, options)
}

const updateSameQuestion = async (data) => {
    const title = data.message.text
    const prompt = data.message.blocks[1].text.text

    const gifQuery = filterQuery(prompt)
    const newGif = await giphyTranslate(gifQuery)

    const updatedQuestion = respBody(title, prompt, newGif, true)

    const options = createOptions("POST", updatedQuestion)

    return await fetch(data.response_url, options)
}

const respBody = (title, prompt, gif, replaceOriginalMsg) => {
    return {
        "response_type": "in_channel",
        "replace_original": replaceOriginalMsg,
        "text": title,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": title
                }
            },
            {
                "type": "section",
                "text":
                {
                    "type": "plain_text",
                    "text": prompt
                }

            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "block_id": "actionblock789",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "New GIF"
                        },
                        "value": "new_gif",
                        "action_id": "gifBtn"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "New question"
                        },
                        "value": "new_question",
                        "action_id": "questionBtn"
                    }
                ]
            },
            {
                "type": "image",
                "image_url": gif,
                "alt_text": "GIF of the day"
            },

        ]

    }
}

function createOptions(method, body) {
    return {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
    }
}

const handleError = async () => {
    const errorGif = await giphyTranslate("error")

    return {
        "response_type": "ephemeral",
        "text": "Something went wrong. Please try again.",
        "blocks": [
            {
                "type": "section",
                "text":
                {
                    "type": "plain_text",
                    "text": "Something went wrong. Please try again!"
                }

            },
            {
                "type": "divider"
            },
            {
                "type": "image",
                "image_url": errorGif,
                "alt_text": "Error"
            },

        ]

    }
}