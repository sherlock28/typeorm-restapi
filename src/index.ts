require('dotenv').config();
import "reflect-metadata";
import { configure, AppDataSource } from './config';

async function main() {
    const app = configure();
    try {
        await AppDataSource.initialize();
        console.log("Database connected")
    } catch (error) {
        console.error("Could not connect to database");
        console.error(error);
    }
    app.listen(app.get('port'), () => {
        console.log(`Server is running on port ${app.get('port')}`);
    });
}

main();