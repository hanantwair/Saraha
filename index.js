import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import initapp from './Src/modules/init.app.js';

const app = express();
initapp(app, express);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port ' + port);
});