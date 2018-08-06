import { createStore } from 'redux';

const initialState = {
  books: []
}

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'GET_BOOKS':
    return {
      ...state,
      books: action.firstData
    }
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map(b => b.id === payload.selectedBookId ? payload.book : b),
      }
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(b => b.id !== action.bookId )
      }
      case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.newBook]
      }
    default:
      return state;
  }

}

const store = createStore(reducer);
export default store;