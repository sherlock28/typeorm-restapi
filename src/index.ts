require('dotenv').config();
import { configure } from './config/app';

const app = configure();

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});