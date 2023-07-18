import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

export const channelBot = new TelegramBot(process.env.CHANNEL_BOT_TOKEN, { polling: true });
export const chatBot = new TelegramBot(process.env.CHAT_BOT_TOKEN, { polling: true });