console.clear();
import express from 'express';
import routes from './routes/routes.js';

const app = express();
app.use(express.json());
app.use('/', routes);


app.listen(3001, () => {
    console.log(`Corriendo correctamente`);
})

