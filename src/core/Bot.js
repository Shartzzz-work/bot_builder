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
		this.updateOffset = 0; // Для отслеживания смещения
		this.isPolling = false; // Флаг для управления опросом
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

/**
 * Запускает поллинг для получения обновлений от Telegram.
 * @param {UpdateHandler} updateHandler - Обработчик обновлений.
 */
async startPolling(updateHandler) {
  let offset = 0;
  while (true) {
    try {
      const updates = await this.getUpdates(offset);
      for (const update of updates) {
        await updateHandler.handle(update);
        offset = update.update_id + 1;
      }
    } catch (error) {
      console.error('Ошибка при получении обновлений:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

	/**
	 * Останавливает периодический опрос.
	 */
	async stopPolling() {
		this.isPolling = false;
		console.log("Polling stopped");
	}

	/**
	 * Устанавливает обработчик для новых обновлений.
	 * @param {Function} handler - Функция для обработки обновлений.
	 */
	onUpdate(handler) {
		this.updateHandler = handler;
	}
}

export default Bot;
