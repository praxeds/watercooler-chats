export const giphyTranslate = async (query) => {
    const randomWeirdness = Math.floor(Math.random() * 10) + 1

    const queryParams = new URLSearchParams({
        api_key: process.env.GIPHY_API_KEY,
        s: query,
        weirdness: randomWeirdness,
    })

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?${queryParams}`)


    const body = await response.json()

    switch (body) {
        case !body.data.images.downsized.url:
            return body.data.images.downsized_medium.url
        case !body.data.images.downsized_medium.url:
            return body.data.images.fixed_height.url
        default:
            return body.data.images.downsized.url
    }
}