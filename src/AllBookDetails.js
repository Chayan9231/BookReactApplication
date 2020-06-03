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
            bookNameError:'',
            authorNameError:'',
            priceError:'',
            item:this.emptyBook
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteBook=this.deleteBook.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    validate = () => {
        let bookNameError= "";
        let authorNameError = "";
        let priceError ="" ;
        const {item} = this.state;
        if(item.price < 1){
          priceError="Price is minimum 1"
        }
        if(item.bookname.length < 1){
          console.log("hi")
          bookNameError="Book Name should have atleast 1 characters"
        }
  
        if(item.author.length < 2){
          console.log("hi")
          authorNameError="Author Name should have atleast 2 characters"
        }
  
        if(priceError || bookNameError ||authorNameError){
          this.setState({priceError,bookNameError,authorNameError});
          return false;
        }
         return true;
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
        const isValid= this.validate();
      if(isValid){
        const {item} = this.state;
        let book = {bookname: item.bookname, author: item.author, price: item.price};
        BookService.updateBooks(book,this.state.item.bookid)
              .then(res => {
                  this.setState({message : 'Book updated successfully.'});
                  window.location.reload(false);
              });
            }
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
          const btnupdatestyle = {
            color: "white",
            backgroundColor: "#4CAF50",
            padding: "6px 15px",
            margin: "4px 10px",
            fontFamily: "Arial"
          };
          const btndeletestyle = {
            color: "white",
            backgroundColor: "#f44336",
            padding: "6px 15px",
            margin: "4px 2px",
            fontFamily: "Arial"
          };
        return (
        <div className="container">         
                <h2 style={{color: "blue"}}>Book Details</h2>
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
                                            <td><button style={btnupdatestyle} onClick={() => this.fetchBookInfo(book)}> Update</button>
                                            <button style={btndeletestyle} onClick={() => this.deleteBook(book.bookid)}>Delete</button></td>
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
         <div style={{color:"red",fontSize:12}}>{this.state.bookNameError}</div>
        <p>Author Name:</p>
        <input
          type='text' value={item.author}
          name='author'
          onChange={this.myChangeHandler}
        />
        <div style={{color:"red",fontSize:12}}>{this.state.authorNameError}</div>
        <p>Price:</p>
        <input
          type='text' value={item.price}
          name='price'
          onChange={this.myChangeHandler}
        />
        <div style={{color:"red",fontSize:12}}>{this.state.priceError}</div>
        <br/>
        <br/>
        <input style={btnupdatestyle} type='submit' />
        </form>
          </div>
        </Popup>
                </div>
            </div>
        )
    }
}

export default AllBookDetails;