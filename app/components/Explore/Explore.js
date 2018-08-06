import './Explore.scss';

import React from 'react';
import { connect } from 'react-redux';
import Book from '../Book/Book';
import Modal from '../Modal/Modal';
import uuid from 'uuid';

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingState: 'loading',
      modal: false,
      selectedBookId: null
    };
  }

  renderModal = () => {
    const bookId = this.state.selectedBookId;
		if(this.state.modal && bookId) {
      const book = this.props.books.find(book => book.id === bookId)
			return(
				<Modal book={book}
               onClose={()=> this.setState({modal: false})}
               onBookUpdate={(updatedBook) => this.updateBook(updatedBook)}
              />
			)
		}
		return null;
	}

  addNewBook = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'ADD_BOOK',
      newBook: {
          id: uuid(),
          author: 'Edit me',
          year: '2018',
          title: 'New Book Added',
          image: 'https://picsum.photos/250/380/?random'
       }
      });
  }

  handleBookClicked(bookId) {
    this.setState({modal: true, selectedBookId: bookId})
  }

  updateBook = (book) => {
    const { dispatch } = this.props;
    const { selectedBookId } = this.state;
    dispatch({type:'EDIT_BOOK', payload: { selectedBookId ,book} });
    this.setState({modal: false})
  }

  removeBook(bookId) {
    const { dispatch } = this.props;
    dispatch({type:'DELETE_BOOK', bookId});
  }

  render(){
    const items = this.props.books;
    return(
      <div className="books-list-div">
            {this.renderModal()}
            <ul className="books-list">
                {items && items.map((book) => <li key={book.id}>
                <Book 
                onBookClick= {()=> this.handleBookClicked(book.id)}
                removeBook= {()=> this.removeBook(book.id)}
                book={book}/>
              </li>)}
              <li className="new" onClick={()=> this.addNewBook()}>
                <span>Add New Book</span> 
                <span className="plus ion-plus-round"></span>
                </li>
            </ul> 
      </div>
    )}
}

function mapStateToProps(state) {
 return {
   books: state.books
 }
}

function mapDispatchToProps(dispatch){
 return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
