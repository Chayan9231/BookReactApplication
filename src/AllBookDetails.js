import React from 'react';
import ReactDOM from 'react-dom';
import BookService from './service/BookService';
import './App.css';
import Popup from "reactjs-popup";

class AllBookDetails extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null,
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteBook=this.deleteBook.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    deleteBook(id) {
        BookService.deleteBook(id)
            .then(
                response => {
                    this.setState({ message: `Delete of book ${id} Successful` })
                    this.refreshCourses()
                }
            )
    }

    refreshCourses() {
        BookService.retrieveAllBooks()
            .then(
                response => {
                    console.log(response);
                    this.setState({ books: response.data._embedded.bookList });
                }
            )
    }
   
    
    render() {
        return (
        <div className="container">         
                <h3>Book Details</h3>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Book Id</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.books.map(
                                    book =>
                                        <tr key={book.bookid}>
                                            <td>{book.bookid}</td>
                                            <td>{book.bookname}</td>
                                            <td>{book.author}</td>
                                            <td>{book.price}</td>
                                            <td><Popup
    trigger={<button className="button"> Update</button>}
    modal
    closeOnDocumentClick
  >
    <span> Work in progress </span>
  </Popup></td>
    <td><button className="btn btn-warning" onClick={() => this.deleteBook(book.bookid)}>Delete</button></td>
        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AllBookDetails;