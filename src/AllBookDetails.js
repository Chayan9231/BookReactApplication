import React from 'react';
import ReactDOM from 'react-dom';
import BookService from './service/BookService';

class AllBookDetails extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
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
        const mystyle = {
            border: "1px solid black",
          };
        return (
            <div className="container">
                <h3>Book Details</h3>
                <div className="container">
                    <table style={mystyle} className="table">
                        <thead>
                            <tr>
                                <th>Book Id</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Price</th>
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