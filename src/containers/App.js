import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';

// Import custom modules
import * as MoviesActions from '../actions/MoviesActions';
import Footer from '../components/Footer';
import List from './List';

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {
  constructor(props){
    super(props);
    this.searchMovie = this.searchMovie.bind(this);
  }

  searchMovie(){
    const query = this.refs.search.value;
    this.props.actions.searchMovie(query);
  }
  render() {
    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { movies } = this.props;
    console.log(movies);
    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Search Your Favourite Movie</h3>
          <hr/>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group form-group-lg">
                <input type="text" ref="search" className="form-control input-lg"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group form-group-lg">
                <button className="btn btn-default btn-lg" onClick={this.searchMovie.bind(this)}>Search Movie</button>
              </div>
            </div>
          </div>
          {movies.loading &&
            <div className="row">
              <div className="col-md-12">
                <h4>Loading</h4>
              </div>
            </div>
          }
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                {movies.movies.results && movies.movies.results.map((movie) => {
                  return <List key={movie.id} {...movie}/>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  movies: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
  return {
    movies: state.movie.toJS()
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MoviesActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
