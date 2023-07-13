import { chatBot } from "../utils/botsEntryPoint.js";
import { getFiles } from "./getFiles.js";
import { mainMenuOptions, portfolioMenuOptions } from "./inline_keyboard.js";

const about = (chatId, data) => {
	chatBot.sendMessage(chatId, data);
};

let current = 0;
let currentFilesIds = [];
let msgId = [];
let files = getFiles()
let loadingId = "";

export const menuRouter = (chatId, data) => {
	const actions = {
		about: () => about(chatId, data),
		portfolio: () => {
			chatBot.sendMediaGroup(chatId, files).then(
				(msg) => (
					chatBot.sendMessage(chatId, "Смотреть другие работы", portfolioMenuOptions.first).then((msg) => {
						(msgId[0] = msg.message_id), console.log(msg);
					}),
					msg.map((data, index) => currentFilesIds.push(data.message_id))
				)
			);
		},
		ask: () => chatBot.sendMessage(chatId, data),
		order: () => chatBot.sendMessage(chatId, data),
		message: () => chatBot.sendMessage(chatId, data),
		next: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				if (current < files.length - 1) {
					current++,
						currentFilesIds.map((obj, index) => {
							let filesToSend = files[current];
							chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
						});
					if (current == 1 && current !== files.length - 1) {
						chatBot.editMessageReplyMarkup(portfolioMenuOptions.normal, {
							chat_id: chatId,
							message_id: msgId[0],
						});
					}

					if (current == files.length - 1) {
						chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyPrev, {
							chat_id: chatId,
							message_id: msgId[0],
						});
					}
					chatBot.deleteMessage(chatId, msg.message_id);
				}
				console.log(current);
			});
		},
		prev: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				if (current != 0) {
					current--;
					currentFilesIds.map((obj, index) => {
						let filesToSend = files[current];
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
				}
				if (current == 0) {
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, {
						chat_id: chatId,
						message_id: msgId[0],
					});
				}
				console.log(current);
				// if (current == 0) {
				// 	chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, {chat_id: chatId, message_id: msgId[0]})
				// } else {
				// 	current--;
				// 	currentFilesIds.map((obj, index) => {
				// 		let filesToSend = files[current];
				// 		chatBot.editMessageMedia(filesToSend[index], {chat_id: chatId, message_id: obj})
				// 	})
				// }
				chatBot.deleteMessage(chatId, msg.message_id);
			});
			// current !== 0
			// 	? (current--,
			// 	  currentFilesIds.map((obj, index) => {
			// 			let filesToSend = files[current];
			// 			chatBot
			// 				.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj })
			// 				.then(() => console.log(current));
			// 	  }))
			// 	: "";
		},
		first: () => {
			current = 0;
			currentFilesIds.map((obj, index) => {
				let filesToSend = files[current];
				chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
			});
			chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, { chat_id: chatId, message_id: msgId[0] });
		},
	};

	return actions[data]?.();
};
