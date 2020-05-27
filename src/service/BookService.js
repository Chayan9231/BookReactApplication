import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';



const BOOK_API_URL = 'http://localhost:8080';

class BookService {

    retrieveAllBooks() {
        return axios.get(`${BOOK_API_URL}/book/getAllBooks`);
    }

    addBooks(book) {
        console.log(JSON.stringify(book));
        return axios.post(`${BOOK_API_URL}/book/createBook`,book);
    }
}

export default new BookService()