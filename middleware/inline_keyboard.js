
export const mainMenuOptions = {
    parse_mode: "html",
    reply_markup:{
        inline_keyboard: [
            [{text: `• cursiveText •`, callback_data: 1}],
            [{text: "Портфолио", callback_data: 1}],
            [{text: "Частые вопросы", callback_data: 1}],
            [{text: "Заказать арт", callback_data: 1}],
            [{text: "Сообщение Автору", callback_data: 1}],
        ]
    }
};