import { NODE_ENV, PORT, DB_URI } from "./config/env";
import app from "./app";
import database from "./database";

database.connect()
	.catch((error) => {
		console.error(error);
		return;
	});

app.listen(PORT, function () {
	console.log(`\nExpress server listening on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`Server: http://localhost:${PORT}/api/`);
	console.log(`Database: ${DB_URI}\n`);
});

export default app;
