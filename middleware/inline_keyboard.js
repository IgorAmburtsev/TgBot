
export const mainMenuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Об авторе", callback_data: "about"}],
            [{text: "Портфолио", callback_data: "portfolio"}],
            [{text: "Частые вопросы", callback_data: "ask"}],
            [{text: "Заказать арт", callback_data: "order"}],
            [{text: "Сообщение Автору", callback_data: "message"}],
        ]
    })
};