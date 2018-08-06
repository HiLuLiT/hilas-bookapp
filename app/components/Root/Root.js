import './Root.scss';

import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Explore from '../Explore/Explore';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class Root extends React.Component {

    getBooks() {
    const { dispatch } = this.props;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../data.json');

    xhr.addEventListener('load', () => {
      const books = JSON.parse(xhr.responseText);
      dispatch({
        type:'GET_BOOKS',
        firstData: books
      });
    });
    xhr.addEventListener('error', () => {
      this.setState({loadingState: 'error'});
    });
    xhr.send();
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="root">
          <Explore />
        </div>
      </ErrorBoundary>
    );
  }
}

function mapDispatchToProps(dispatch){
 return { dispatch };
}

export default connect(null, mapDispatchToProps)(Root);
