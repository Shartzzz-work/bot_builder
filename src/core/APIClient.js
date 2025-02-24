/**
 * Класс для взаимодействия с Telegram API.
 * @class
 */
class APIClient {
	/**
	 * Создает экземпляр APIClient.
	 * @param {string} token - Токен бота от Telegram.
	 */
	constructor(token) {
		this.token = token;
	}

	/**
	 * Отправляет запрос к Telegram API.
	 * @param {string} method - Название метода API (например, 'sendMessage').
	 * @param {Object} params - Параметры запроса.
	 * @returns {Promise<Object>} Ответ от Telegram API в формате JSON.
	 */
	async request(method, params) {
		const url = `https://api.telegram.org/bot${this.token}/${method}`;
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(params),
		});
		return await response.json();
	}
}

export default APIClient;
