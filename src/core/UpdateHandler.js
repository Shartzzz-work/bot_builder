/**
 * Класс для обработки обновлений от Telegram.
 * @class
 */
class UpdateHandler {
	/**
	 * Обрабатывает входящее обновление.
	 * @param {Object} update - Обновление от Telegram.
	 */
	handleUpdate(update) {
		console.log("Получено обновление:", update);
	}
}

export default UpdateHandler;
