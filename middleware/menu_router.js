import { chatBot } from "../utils/bots_entry_point.js";
import { getFiles } from "./get_files.js";
import { mainMenuOptions, orderMenuOptions, portfolioMenuOptions, buttonBack } from "./inline_keyboard.js";
import { orderText } from "../utils/texts.js";
import imgur from "imgur";
import imageToBase64 from "image-to-base64";
import downloader from "./downloader.js";
import OrderModel from "../Models/OrderModel.js";

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const client = new imgur.ImgurClient({ clientId: process.env.IMGUR_ID });

const b64 = async (path) => {
	return await imageToBase64(path)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};

let files = getFiles();

let obj = {
	orderFrom: "",
	orderFromChatId: "",
	orderReference: ["123", 312],
	orderCaption: "2312312312",
	orderOptions: {
		numberOfPerson: 0,
		sizeOption: "312312",
		completenessOption: "321321",
		renderOption: "321312",
		backgroundOption: "321321312",
	},
};

let current = 0;
let currentFilesIds = [];
let currentOrderMessageId = [];
let msgId = [];
export let arrayOfMsges = [];

export const menuRouter = (chatId, data, message) => {
	const actions = {
		about: () => about(chatId, data),
		portfolio: () => {
			current = 0;
			msgId = [];
			currentFilesIds = [];
			chatBot.sendMediaGroup(chatId, files[0]).then(
				(msg) => (
					console.log(msg),
					chatBot
						.sendMessage(chatId, "Смотреть другие работы", portfolioMenuOptions.mainHasOnlyNext)
						.then((msg) => {
							msgId[0] = msg.message_id;
							console.log(currentFilesIds);
						}),
					msg.map((data, index) => currentFilesIds.push(data.message_id))
				)
			);
		},
		ask: () => chatBot.sendMessage(chatId, data),
		order: () => {
			currentOrderMessageId = [];
			console.log(currentOrderMessageId);
			chatBot.sendMessage(chatId, orderText.mainText, { parse_mode: "HTML" }).then((msg) => {
				currentOrderMessageId.push(msg.message_id),
					chatBot
						.sendMessage(
							chatId,
							"Нажмите на кнопку чтобы сделать заказᅠ  ᅠᅠᅠ ᅠᅠ ᅠ",
							orderMenuOptions.mainOrderMenu
						)
						.then((msg) => {
							currentOrderMessageId[1] = msg.message_id;
							// console.log(currentFilesIds);
						});
			});
		},
		message: () => chatBot.sendMessage(chatId, data),
		next: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				current++;
				console.log(current);
				let filesToSend = files[current];
				if (current === 1) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.normal, {
						chat_id: chatId,
						message_id: msgId[0],
					});
				}
				if (current === files.length - 1) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyPrev, {
						chat_id: chatId,
						message_id: msgId[0],
					});
				}
				if (current !== 1 && current !== files.length - 1) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
				}

				chatBot.deleteMessage(chatId, msg.message_id);
			});
		},
		prev: () => {
			chatBot.sendMessage(chatId, "Загрузка...").then((msg) => {
				current--;
				console.log(current);
				let filesToSend = files[current];
				if (current === files.length - 2) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.normal, {
						chat_id: chatId,
						message_id: msgId[0],
					});
				}
				if (current === 0) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
					chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, {
						chat_id: chatId,
						message_id: msgId[0],
					});
				}
				if (current != 1 && current != files.length - 1) {
					currentFilesIds.map((obj, index) => {
						chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
					});
				}
				chatBot.deleteMessage(chatId, msg.message_id);
			});
		},
		first: () => {
			console.log(currentFilesIds);
			current = 0;
			currentFilesIds.map((obj, index) => {
				let filesToSend = files[current];
				chatBot.editMessageMedia(filesToSend[index], { chat_id: chatId, message_id: obj });
			});
			chatBot.editMessageReplyMarkup(portfolioMenuOptions.hasOnlyNext, { chat_id: chatId, message_id: msgId[0] });
		},
		startOrder: () => {
			console.log(currentOrderMessageId[0]);
			chatBot
				.editMessageText(orderText.firstQuestion, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
					chatBot
						.editMessageText("Выберите подходящий вариант...ᅠᅠ ᅠ ᅠᅠ ᅠᅠ ᅠᅠ ᅠ", {
							chat_id: chatId,
							message_id: currentOrderMessageId[1],
							parse_mode: "HTML",
						})
						.then(() => {
							chatBot.editMessageReplyMarkup(orderMenuOptions.numberOfPersonOption, {
								chat_id: chatId,
								message_id: currentOrderMessageId[1],
							});
						})
				);
		},
		done: async () => {
			await sleep(1000)
			console.log(obj)
			try {
				const order = new OrderModel({
					orderFrom: obj.orderFrom,
					orderFromChatId: obj.orderFromChatId,
					orderReference: arrayOfMsges,
					orderCaption: obj.orderCaption,
					orderOptions: {
						numberOfPerson: obj.orderOptions.numberOfPerson,
						sizeOption: obj.orderOptions.sizeOption,
						completenessOption: obj.orderOptions.completenessOption,
						renderOption: obj.orderOptions.renderOption,
						backgroundOption: obj.orderOptions.backgroundOption,
					}
				})
				const newModel = await order.save();
			} catch(err) {
				console.log(err)
			}

			chatBot.sendMessage(chatId, '<b>Готово!</b>\nЗаказ оформлен и отправлен на подтверждение, после чего вы получите уведомление в этом чате с подтверждением и реквизитами для оплаты', buttonBack)
		},
	};

	if (data === "one" || data === "two" || data === "three") {
		actions[data] = () => {
			let numOfData = data === "one" ? 1 : data === "two" ? 2 : 3;
			obj.orderOptions.numberOfPerson = numOfData;
			chatBot
				.editMessageText(orderText.secondQuestion, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
					chatBot.editMessageReplyMarkup(orderMenuOptions.sizeOption, {
						chat_id: chatId,
						message_id: currentOrderMessageId[1],
					})
				);
		};
	}

	if (data === "fullsize" || data === "half" || data === "head") {
		actions[data] = () => {
			let textOfData = data === "fullsize" ? "Фулл" : data === "half" ? "Халф" : "Голова";
			obj.orderOptions.sizeOption = textOfData;
			chatBot
				.editMessageText(orderText.thirdQuestion, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
					chatBot.editMessageReplyMarkup(orderMenuOptions.completnessOption, {
						chat_id: chatId,
						message_id: currentOrderMessageId[1],
					})
				);
		};
	}

	if (data === "sketch" || data === "sketchWColor" || data === "fullArt") {
		actions[data] = () => {
			let textOfData =
				data === "sketch" ? "Скетч" : data === "sketchWColor" ? "Скетч с покраской" : "Полноценный арт";
			obj.orderOptions.completenessOption = textOfData;
			chatBot
				.editMessageText(orderText.fourthQuestion, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
					chatBot.editMessageReplyMarkup(orderMenuOptions.renderOption, {
						chat_id: chatId,
						message_id: currentOrderMessageId[1],
					})
				);
		};
	}

	if (data === "render" || data === "noRender") {
		actions[data] = () => {
			let textOfData = data === "render" ? "С рендером" : "Без рендера";
			obj.orderOptions.renderOption = textOfData;
			chatBot
				.editMessageText(orderText.fifthQuestion, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
					chatBot.editMessageReplyMarkup(orderMenuOptions.backgroundOption, {
						chat_id: chatId,
						message_id: currentOrderMessageId[1],
					})
				);
		};
	}

	if (data === "backgroundColor" || data === "backgroundDetailed") {
		actions[data] = async () => {
			let textOfData = data === "backgroundColor" ? "Только цвет" : "Детализированный фон";
			obj.orderOptions.backgroundOption = textOfData;
			chatBot
				.editMessageText(orderText.finaleText, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
					parse_mode: "HTML",
				})
				.then(() =>
				chatBot.editMessageReplyMarkup(orderMenuOptions.doneOrder, {
					chat_id: chatId,
					message_id: currentOrderMessageId[0],
				}),
				chatBot.deleteMessage(chatId, currentOrderMessageId[1])
			);
			chatBot.on("message", async (msg) => {
				if (msg.photo) {
					const fileName = "new_memes";
					const path = `./Portfolio/${fileName + ".jpg"}`;

					chatBot.getFileLink(msg.photo[msg.photo.length - 1].file_id).then(async (link) => {
						let url = await downloader(link, fileName, path);
					});

					await sleep(1000);
					await b64(path).then(async (res) => {
						const uploadImage = await client.upload({
							image: res,
							type: "base64",
						});

						arrayOfMsges.push(uploadImage.data.link);
						obj.orderFrom = '@'+ msg.from.username
						obj.orderFromChatId = chatId
						msg.text === undefined ? '' : obj.orderCaption = msg.text
					});
				}
			});
		};
	}



	return actions[data]?.();
};
