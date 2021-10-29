const { default: fetch } = require("node-fetch");
const { Bot } = require("grammy")
const { hydrateReply, parseMode } = require("@grammyjs/parse-mode");

async function getDataQuote() {
    const res = await fetch("https://animechan.vercel.app/api/random")
    return await res.json()
}

const bot = new Bot(process.env.BOT_TOKEN)

bot.use(hydrateReply);

bot.api.config.use(parseMode("HTML"));

bot.command("quote", async (ctx) => {
    const quotes = await getDataQuote()

    let messages = `<i>${quotes.quote}</i>\n`
    messages += `<b>${quotes.character}</b> - <i>${quotes.anime}</i>`
    
    await ctx.replyWithHTML(messages)
})

bot.api.setMyCommands([
    { command: "quote", description: "Menampilkan quote anime" }
])

bot.start();
