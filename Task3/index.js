const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database"
let books = [];
let nextId = 1;

// CREATE a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    const book = { id: nextId++, title, author };
    books.push(book);
    res.status(201).json(book);
});

// READ all books
app.get('/books', (req, res) => {
    res.json(books);
});

// READ a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// UPDATE a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    res.json(book);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
