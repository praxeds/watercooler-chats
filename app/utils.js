import { prompts } from "./prompts"

const kaomojis = [
    "(^_^)/",
    "(^o^)",
    "(^o^)/",
    "(^_^)v",
    "ヽ(⌐■_■)ノ♪♬",
    "(｡♥‿♥｡)",
    "ヾ(＾-＾)ノ",
    "(^▽^)/",
    "ヽ(＾Д＾)ﾉ",
    "ヽ(⌐■_■)ノ",
    "(✿◠‿◠)",
    "(｡♥‿♥｡)",
    "ヾ(⌐■_■)ノ♪",
    "（＾ｖ＾）",
    "٩(◕‿◕｡)۶",
    "(⌒‿⌒)",
    "ヽ(＾Д＾)ﾉ",
    "(＾◡＾)",
    "ヾ(＾-＾)ノ",
    "٩(｡•́‿•̀｡)۶",
    "(✿◡‿◡)",
    "٩(◕‿◕｡)۶",
    "(＾◡＾)",
    "(≧◡≦)",
    "ヽ(＾Д＾)ﾉ",
    "(^▽^)/",
    "(｡♥‿♥｡)",
    "ヾ(＾-＾)ノ",
    "(^_^)/",
    "(＾◡＾)",
    "(≧◡≦)",
    "(^▽^)/",
    "ヾ(＾-＾)ノ",
    "٩(◕‿◕｡)۶",
    "(｡♥‿♥｡)",
    "ヽ(＾Д＾)ﾉ",
    "(^_^)/",
    "(＾◡＾)",
    "(≧◡≦)",
    "ヽ(＾-＾)ノ",
    "٩(◕‿◕｡)۶",
    "(｡♥‿♥｡)",
    "ヾ(＾-＾)ノ",
    "(^_^)/",
    "(＾◡＾)",
    "(≧◡≦)",
    "ヽ(＾Д＾)ﾉ",
    "(⌒‿⌒)",
    "ヽ(⌐■_■)ノ",
    "(^▽^)/"
]

const emojiCombos = [
    "🌼🌞🍃",
    "🌴🌺🌊",
    "🌸🌞🍹",
    "🌞📚💼",
    "🍹📆🏖️",
    "🌞🏝️🍉",
    "🍃🌿💻",
    "🏖️🌞🌴",
    "🌸🌼🍦",
    "🍹🌞🌊",
    "🌻🍃🎉",
    "🏖️🌴🌞",
    "🌞🍔🍹",
    "🌿🌼🌞",
    "🌺🏖️🌴",
    "📚💼🌞",
    "🍦🍉🌞",
    "🍃💻🌿",
    "🏝️🌸🌞",
    "🌞🌊🌴",
    "🌻🎉🍃",
    "🍔🍹🌞",
    "🌴🌞🏖️",
    "🌞🌼🌸",
    "🍹🌊🏝️",
    "🌿💻📚",
    "🌞🍦🍉",
    "🍃🏖️🌴",
    "🏖️🌞🍹",
    "🌞💼🍔",
    "🌞🌊🌞",
    "🌴🌼🏝️",
    "🍦🌸🌞",
    "🌞🎉🌿",
    "🌿🍔📚",
    "🌞🍉🌺",
    "🍃🏝️🏖️",
    "🏝️🌴🌊",
    "🌞🌞🌞",
    "🌸🏖️🍦",
    "🏝️🌼💼",
    "🍹📆🍔",
    "🌺🌞🌞",
    "🍦🏖️🌞",
    "🌞🍉📚",
    "🌴🍃🍔",
    "🍃🌞🌺",
    "📆🏝️🍹",
    "🌞🌞🌞",
    "🍔🍦🌴"
]

const wordsToIgnore = ["a", "about", "about", "an", "and", "any", "are", "at", "attend", "be", "be?", "best", "challenging", "choose?", "could", "current", "day.", "did", "do", "dream", "ever", "experiences", "famous", "favorite", "for", "give", "had", "have", "how", "if", "in", "in?", "indulge", "instantly", "inspiring", "is", "it", "it?", "know", "last", "learn", "like", "major", "meet", "mesmerizing", "most", "natural", "new", "of", "one", "or", "participated", "picture", "recommend", "seen", "share", "should", "show", "something", "something,", "spend", "taken", "tell", "that", "the", "them", "think", "to", "tried", "type", "unusual", "us", "visit", "visited", "was", "was", "were", "were", "what", "what's", "when", "which", "who", "why", "with", "would", "you", "you?", "you'd", "you've", "your", "watched", "witnessed"]


const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}


export const filterQuery = (query) => {
    const lowerCaseQuery = query.toLowerCase()
    const words = lowerCaseQuery.split(" ")

    const filteredWords = words.filter((word) => !wordsToIgnore.includes(word))

    const filteredQuery = filteredWords.join(" ")

    return filteredQuery
}

export const getRandomKaomoji = () => getRandom(kaomojis)
export const getRandomEmojiCombo = () => getRandom(emojiCombos)
export const getRandomPrompt = () => getRandom(prompts)