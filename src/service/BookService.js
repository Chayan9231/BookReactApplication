import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';



// const BOOK_API_URL = 'http://localhost:8080';
const BOOK_API_URL = 'https://bookapplicationpoc.herokuapp.com/book'

class BookService {

    retrieveAllBooks() {
        return axios.get(`${BOOK_API_URL}/getAllBooks`);
    }

    addBooks(book) {
        console.log(JSON.stringify(book));
        return axios.post(`${BOOK_API_URL}/createBook`,book);
    }

    deleteBook(id) {
        return axios.delete(`${BOOK_API_URL}/deleteBook/${id}`);
    }

    updateBooks(book,id) {
        console.log(JSON.stringify(book))
        return axios.put(`${BOOK_API_URL}/updateBook/${id}`,book);
    }
}

export default new BookService()