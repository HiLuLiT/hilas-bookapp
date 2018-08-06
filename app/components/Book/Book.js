import './Book.scss';
import React from 'react';
import Modal from '../Modal/Modal';

export default class Book extends React.Component {
  render() {
    const {onBookClick , removeBook, book} = this.props;
    return (
      <div className="book">
           <img src={book.image}/>
           <div className="info">
             <span className="book-name">{book.title}</span>
             <button className="edit ion-edit" onClick={onBookClick}></button>
             <button className="delete ion-ios-trash" onClick={removeBook}></button>
             <span className="author">{book.author}</span>
             <span className="year">{book.year}</span>
           </div>
      </div>
    )
  }
}
