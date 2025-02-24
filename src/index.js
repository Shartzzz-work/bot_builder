import { default as Bot } from "./core/Bot";

const bot = new Bot(process.env.BOT_TOKEN);

bot.start();

bot.sendMessage(process.env.CHAT_ID, "test");

bot.getUpdates(1);

bot.stop();
