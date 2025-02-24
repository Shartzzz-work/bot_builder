import APIClient from "./APIClient.js";

/**
 * Основной класс для управления Telegram-ботом.
 * @class
 */
class Bot {
	/**
	 * Создает экземпляр бота.
	 * @param {string} token - Токен бота от Telegram.
	 */
	constructor(token) {
		this.api = new APIClient(token);
		this.updateHandler = null;
	}

	/**
	 * Запускает бота в режиме консольного логирования.
	 */
	start() {
		console.log("Бот запущен");
	}

	/**
	 * Останавливает бота (заглушка для будущей реализации).
	 */
	stop() {
		console.log("Бот остановлен");
	}

	/**
	 * Отправляет сообщение в указанный чат.
	 * @param {number|string} chatId - ID чата или юзернейм.
	 * @param {string} text - Текст сообщения.
	 * @returns {Promise<Object>} Ответ от Telegram API.
	 */
	async sendMessage(chatId, text) {
		return this.api.request("sendMessage", { chat_id: chatId, text });
	}

	/**
	 * Получает обновления от Telegram.
	 * @param {number} offset - Смещение для получения новых обновлений.
	 * @returns {Promise<Object>} Список обновлений.
	 */
	async getUpdates(offset) {
		return this.api.request("getUpdates", { offset });
	}
}

export default Bot;
