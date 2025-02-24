import { default as Bot } from "./core/Bot";

async function main() {
	const bot = new Bot(process.env.BOT_TOKEN);

	bot.onUpdate((update) => {
		console.log("New update:", update);
		// Пример: ответить на сообщение
		if (update.message) {
			bot.sendMessage(update.message.chat.id, `Echo: ${update.message.text}`);
		}
	});

	bot.start(); // "Бот запущен"
	await bot.startPolling(1000); // Опрос каждую секунду

	// Остановка через 10 секунд (для теста)
	setTimeout(() => bot.stopPolling(), 10000);
}

main();
