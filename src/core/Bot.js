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
	 * Запускает периодический опрос Telegram API для получения обновлений.
	 * @param {number} [interval=1000] - Интервал опроса в миллисекундах.
	 */
	async startPolling(interval = 1000) {
		if (this.isPolling) {
			console.log("Polling is already running");
			return;
		}

		this.isPolling = true;
		console.log("Starting polling...");

		while (this.isPolling) {
			try {
				const response = await this.getUpdates(this.updateOffset);
				if (!response.ok) {
					throw new Error(`Telegram API error: ${response.description}`);
				}
				const updates = response.result; // Извлекаем массив обновлений
				if (updates && updates.length > 0) {
					for (const update of updates) {
						if (this.updateHandler) {
							this.updateHandler(update);
						}
						this.updateOffset = update.update_id + 1; // Обновляем offset
					}
				}
				await new Promise((resolve) => setTimeout(resolve, interval));
			} catch (error) {
				console.error("Polling error:", error);
				await new Promise((resolve) => setTimeout(resolve, interval));
			}
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
