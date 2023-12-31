import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// Route for posting books to the db
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishyear || !request.body.imgLink)
        {
            return response.status(400).send({
                message: 'Send all required fields : title, author, imgLink and publishyear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            imgLink: request.body.imgLink,
            publishyear: request.body.publishyear,
        };
        
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all books from the db
router.get('/all', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json(
            {
                count: books.length,
                data: books
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting one book by id from db
router.get('/details/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for update a book
router.put('/update/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishyear)
        {
            return response.status(400).send({
                message: 'Send all required fields : title, author, publishyear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: "Book not found !"});
        }

        return response.status(200).send({ message: "Book updated succesfully !"});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete a book
router.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: "Book not found !"});
        }

        return response.status(200).send({ message: "Book deleted succesfully !"});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;