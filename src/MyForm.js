import React from 'react';
import ReactDOM from 'react-dom';
import BookService from './service/BookService';

class MyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bookName: '',
        authorName: '',
        price: null,
      };
    }
    mySubmitHandler = (event) => { 
      event.preventDefault();
      let book = {bookname: this.state.bookName, author: this.state.authorName, price: this.state.price};
      BookService.addBooks(book)
            .then(res => {
                this.setState({message : 'Book added successfully.'});
                this.props.history.push('/books');
            });
    }
    myChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    render() {
      const mystyle = {
        color: "black",
        backgroundColor: "white",
        marginLeft: "220px",
        fontFamily: "Arial"
      };
      return (
        <form style={mystyle} onSubmit={this.mySubmitHandler}>
        <h1 >Add Book Details</h1>
        <p>Book Name:</p>
        <input
          type='text'
          name='bookName' autoComplete="off"
          onChange={this.myChangeHandler}
        />
        <p>Author Name:</p>
        <input
          type='text'
          name='authorName'
          onChange={this.myChangeHandler}
        />
        <p>Price:</p>
        <input
          type='text'
          name='price'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' />
        </form>
      );
    }
  }
  
  export default MyForm; 

 // ReactDOM.render(<MyForm />, document.getElementById('root'));