import App from "./app.js";
import Database from "./database.js";
import { EnvConfig } from "./config/index.js";

/**
 * Connects to the database and starts the server
 */
async function main() {
	// connect to database
	await Database.connect();

	// run the server
	App.listen(EnvConfig.PORT || 3001, () => {
		console.log(`\nServer listening on port ${EnvConfig.PORT}`);
	});
}

main();
