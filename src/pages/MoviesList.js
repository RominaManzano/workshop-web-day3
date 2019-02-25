import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';

import API from '../api';
import MovieCard from '../components/MovieCard';
import NoResults from '../common/NoResults';
import PlaceholderCard from '../components/PlaceholderCard';
import SearchInput from '../components/SearchInput';

/*
  react life-cycle methods can only be accesed on class-based components.
  As a class in any other language, react classes, have their own methods.
  One of the most important and the one we use for getting the data is 'componentDidMount'.
  This method is called right after the component is loaded onto the browser, and is
  the perfect place to initialize the data.
  The other important life-cycle method is the 'render' method. It takes care of
  displaying our JSX content on the browser.
*/

class MoviesList extends Component {
  state = {
    movies: [],
    loading: true,
    loadingSpinner: false,
    message: '',
    searchTerm: '',
  };

  componentDidMount() {
    API.get('/movies')
      .then(res => {
        const movies = res.data.data;

        setTimeout(() => {
          this.setState({
            movies,
            loading: false
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          message: 'An error ocurred',
          loading: false,
        });
      });
  }

  renderPlaceHolders = () => {
    const placeholders = [];

    for (let i = 0; i < 8; i += 1) {
      placeholders.push(
        <Col lg="3" md="3" sm="6" xs="12" key={i}>
          <PlaceholderCard height="380px" />
        </Col>,
      );
    }

    return (
      <Fragment>
        <StyledRow>
          <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <PlaceholderCard height="45px" />
          </Col>
        </StyledRow>
        <StyledRow>
          {placeholders}
        </StyledRow>
      </Fragment>
    );
  }

  /*
    Data mapping
  */
  renderMovieCards = () => {
    const { movies } = this.state;

    if (movies.length <= 0) {
      return <NoResults message={'No resulst found'} />;
    }

    const movieCards = movies.map(movie => (
      <Col lg="3" md="3" sm="6" xs="12" key={movie.imdbID}>
        <MovieCard movie={movie} />
      </Col>
    ));

    return (
      <StyledRow>
        {movieCards}
      </StyledRow>
    );
  }

  handleSearchSubmit = (event) => {
    const { searchTerm } = this.state;

    event.preventDefault();
    this.setState({ loadingSpinner: true });

    API.get('/movies', {
      params: { 'search': searchTerm }
    })
      .then(res => {
        const movies = res.data.data;

        setTimeout(() => {
          this.setState({
            movies,
            loading: false,
            loadingSpinner: false,
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          message: 'No se encontraron películas',
          loading: false,
          loadingSpinner: false,
        });
      });
  };

  handleInputChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const { loading, message, searchTerm, loadingSpinner } = this.state;

    /*
      If we try to process data before we have it, the app will break down.
    */
    if (loading) {
      return (
        <Container>
          {this.renderPlaceHolders()}
        </Container>
      );
    }

    if (message) {
      return <span>{message}</span>;
    }

    /*
      Components separation.
    */
    return (
      <Container>
        <StyledRow>
          <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <SearchInput
              handleSearchSubmit={this.handleSearchSubmit}
              handleInputChange={this.handleInputChange}
              searchTerm={searchTerm}
              loading={loadingSpinner}
              />
          </Col>
        </StyledRow>
        {this.renderMovieCards()}
      </Container>
    );
  }
}

export default MoviesList;

const StyledRow = styled(Row)`
  margin-top: 30px;
`;
