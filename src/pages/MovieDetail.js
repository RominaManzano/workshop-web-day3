import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import {
  Button,
  Container,
  Col,
  Row,
} from 'reactstrap';

import API from '../api';
import NoResults from '../common/NoResults';
import PlaceholderCard from '../components/PlaceholderCard';
import { animatedText, scaleLeft, zoomIn } from '../common/animations';

const message = 'No se encontraron datos';

class MovieDetail extends Component {
  state = {
    movie: null,
    loading: true,
    message: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.getMovieById(id);
    } else {
      this.setState({ message, loading: false });
    }
  }

  getMovieById = (id) => {
    API.get(`/movies/${id}`)
      .then(res => {
        const movie = res.data.data;

        setTimeout(() => {
          this.setState({ movie, loading: false });
        }, 1000);
      })
      .catch(error => {
        this.setState({ message: error.response.data.message, loading: false });
      });
  }

  renderPlaceHolders = () => {
    return (
      <Container>
        <StyledRow>
          <Col md="4" xs="12">
            <PlaceholderCard height="70vh" />
          </Col>
          <Col md="8" xs="12">
            <PlaceholderCard height="40px" />
            <PlaceholderCard height="30px" />
            <PlaceholderCard height="50vh" />
          </Col>
        </StyledRow>
      </Container>
    );
  }

  /*
    Fragments: react requires you to enclose all sibling components in a unique
    parent component. This is the case, because a component is essencially a
    function, which returns a single result (a single JSX component).
    When we don't have a specific parent to enclose the sibling components, we
    can either use a common <div> tag, which can be styled or we can use the
    <Fragment> component, which acts as an invisble div, just taking the rol of
    a substitute parent component.
  */
  renderMovieDetails = () => {
    const { movie } = this.state;
    const displayWebsite = movie.Website && (movie.Website !== 'N/A');

    return (
      <Fragment>
        <MoviePlot>
          {movie.Plot}
        </MoviePlot>

        <MovieLabel>
          <label>
            Genre:
          </label>
          {movie.Genre}
        </MovieLabel>
        <MovieLabel>
          <label>
            Director:
          </label>
          {movie.Director}
        </MovieLabel>
        <MovieLabel>
          <label>
            Actors:
          </label>
          {movie.Actors}
        </MovieLabel>

        {
          displayWebsite && (
            <a href={movie.Website} target="_blank" rel="noopener noreferrer">
              <Button color="info">
                More info
              </Button>
            </a>
          )
        }
      </Fragment>
    );
  }

  render() {
    const { loading, message, movie } = this.state;

    if (loading) {
      const placeholders = this.renderPlaceHolders();
      return placeholders;
    }

    if (message) {
      return <NoResults message={message} />;
    }

    return (
      <Container>
        <StyledRow>
          <Col md="4" xs="12">
            <MoviePoster alt={movie.Title} src={movie.Poster} />
          </Col>
          <Col md="8" xs="12">
            <MovieTitle>
              {movie.Title} ({movie.Year})
            </MovieTitle>

            <MovieRating>
              <StarRatings
                rating={Number(movie.imdbRating)}
                starRatedColor="rgb(218,165,32)"
                numberOfStars={10}
                starDimension="20px"
                starSpacing="3px"
                name="rating"
              />
              <RatingNumber>
                ({movie.imdbRating})
              </RatingNumber>
            </MovieRating>

            {this.renderMovieDetails()}
          </Col>
        </StyledRow>
      </Container>
    );
  }
}

export default MovieDetail;

const StyledRow = styled(Row)`
  margin-top: 30px;
`;

const MoviePoster = styled.img`
  animation: ${zoomIn} 0.5s linear;
`;

const MovieTitle = styled.h1`
  animation: ${scaleLeft} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

const MovieRating = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  animation: ${animatedText} 0.6s ease-out 1 both;
`;

const RatingNumber = styled.div`
  padding-top: 5px;
  margin-left: 5px;
`;

const MoviePlot = styled.p`
  font-size: 18px;
  display: inline-block;
  animation: ${animatedText} 0.6s ease-out 1 both;
`;

const MovieLabel = styled.p`
  animation: ${scaleLeft} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;

  label {
    font-weight: 600;
    margin-right: 5px;
    color: #038b9f;
  }
`;
