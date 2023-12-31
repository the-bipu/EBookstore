import express, { request, response } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import courseBookRoute from './routes/courseBookRoute.js';
import { URI, PORT } from './config.js';

const app = express();
app.use(express.json());


// Middleware for handling cors origin
// Method 1: allow all origins with default of cors(*)
app.use(cors());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Main Page');
});

app.use('/books', booksRoute);
app.use('/coursebook', courseBookRoute);

mongoose
    .connect(URI)
    .then(() => {
        console.log('App connected to database.');
        app.listen(process.env.PORT || 5555, () => {
            console.log(`App is listening to Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

// Middleware for handling cors origin

// Method 1: allow all origins with default of cors(*)
// app.use(cors());

// Method 2: allow custom origins
// app.use(cors({
//         origin: '',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );