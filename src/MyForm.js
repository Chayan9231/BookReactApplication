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
        bookNameError:'',
        authorNameError:'',
        priceError:'',
      };
    }

    validate = () => {
      let bookNameError= "";
      let authorNameError = "";
      let priceError ="" ;
      if(this.state.price < 1){
        priceError="Price is minimum 1"
      }
      if(this.state.bookName.length < 1){
        console.log("hi")
        bookNameError="Book Name should have atleast 1 characters"
      }

      if(this.state.authorName.length < 2){
        console.log("hi")
        authorNameError="Author Name should have atleast 2 characters"
      }

      if(priceError || bookNameError ||authorNameError){
        this.setState({priceError,bookNameError,authorNameError});
        return false;
      }
       return true;
    }
    mySubmitHandler = (event) => { 
      event.preventDefault();
      const isValid= this.validate();
      if(isValid){
      let book = {bookname: this.state.bookName, author: this.state.authorName, price: this.state.price};
      BookService.addBooks(book)
            .then(res => {
                this.setState({message : 'Book added successfully.'});
                this.props.history.push('/books');
            });
          }
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
      const btnupdatestyle = {
        color: "white",
        backgroundColor: "#4CAF50",
        padding: "6px 15px",
        margin: "4px 2px",
        fontFamily: "Arial"
      };
      return (
        <form style={mystyle} onSubmit={this.mySubmitHandler}>
        <h1 style={{color: "blue"}}>Add Book Details</h1>
        <p>Book Name:</p>
        <input
          type='text' placeholder="book name"
          name='bookName' autoComplete="off"
          onChange={this.myChangeHandler}
        />
        <div style={{color:"red",fontSize:12}}>{this.state.bookNameError}</div>
        <p>Author Name:</p>
        <input
          type='text' placeholder="author name"
          name='authorName' autoComplete="off"
          onChange={this.myChangeHandler}
        />
        <div style={{color:"red",fontSize:12}}>{this.state.authorNameError}</div>
        <p>Price:</p>
        <input
          type='text' placeholder="price"
          name='price' autoComplete="off"
          onChange={this.myChangeHandler}
        />
        <div style={{color:"red",fontSize:12}}>{this.state.priceError}</div>
        <br/>
        <br/>
        <input style={btnupdatestyle} type='submit' />
        </form>
      );
    }
  }
  
  export default MyForm; 

 // ReactDOM.render(<MyForm />, document.getElementById('root'));