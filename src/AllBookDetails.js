import React from 'react';
import ReactDOM from 'react-dom';
import BookService from './service/BookService';
import './App.css';
import Popup from "reactjs-popup";

class AllBookDetails extends React.Component {
 
    emptyBook = {
        bookid: '',
        bookname: '',
        author: '',
        price: ''
      };

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null,
            open: false,
            item:this.emptyBook
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteBook=this.deleteBook.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    fetchBookInfo(book){
        console.log(JSON.stringify(book));
        this.setState({item: book});
        this.openModal();
    }

    openModal() {
        this.setState({ open: true });
      }
      closeModal() {
        this.setState({ open: false });
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
    mySubmitHandler = (event) => { 
        console.log("*****"+this.state.item.bookid);
        event.preventDefault();
        const {item} = this.state;
        let book = {bookname: item.bookname, author: item.author, price: item.price};
        BookService.updateBooks(book,this.state.item.bookid)
              .then(res => {
                  this.setState({message : 'Book updated successfully.'});
                  window.location.reload(false);
              });
      }
      myChangeHandler = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
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
        const {item} = this.state;
        const mystyle = {
            color: "black",
            backgroundColor: "white",
            marginLeft: "50px",
            fontFamily: "Arial"
          };
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
                                <th>Action</th>
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
                                            <td><button className="button" onClick={() => this.fetchBookInfo(book)}> Update</button>
                                            <button className="btn btn-warning" onClick={() => this.deleteBook(book.bookid)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
       <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal} >
          <div className="modal">
        <form  style={mystyle} onSubmit={this.mySubmitHandler}>
        <h1 >Update Book Details</h1>
        <p>Book Name:</p>
        <input
          type='text' value={item.bookname}
          name='bookname' autoComplete="off"
          onChange={this.myChangeHandler}
        />
        <p>Author Name:</p>
        <input
          type='text' value={item.author}
          name='author'
          onChange={this.myChangeHandler}
        />
        <p>Price:</p>
        <input
          type='text' value={item.price}
          name='price'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' />
        </form>
          </div>
        </Popup>
                </div>
            </div>
        )
    }
}

export default AllBookDetails;