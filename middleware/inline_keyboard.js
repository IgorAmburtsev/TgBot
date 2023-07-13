export const mainMenuOptions = {
    parse_mode: 'HTML',
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

export const adminMenuOptions = {
    
}

export const portfolioMenuOptions = {
    first: {    
        reply_markup:{
        inline_keyboard: [
            [{text: '▶️', callback_data: "next"}]
        ]
    }},
    normal: {    
        inline_keyboard: [
            [{text: "◀️", callback_data: "prev"},{text: "⏺", callback_data: "first"},{text: '▶️', callback_data: "next"}]
        ]
    },
    hasOnlyPrev: {    
        inline_keyboard: [
            [{text: "◀️", callback_data: "prev"},{text: "⏺", callback_data: "first"}]
        ]
    },
    hasOnlyNext: {    
        inline_keyboard: [
            [{text: '▶️', callback_data: "next"}]
        ]
    },
};
